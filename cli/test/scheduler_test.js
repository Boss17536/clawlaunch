const assert = require("assert");
const { parseTime, calculatePostDays } = require("../src/scheduler");
const { checkSchedulerDays } = require("../src/config");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Mock config for testing checkSchedulerDays
const TEST_CONFIG_DIR = path.join(os.homedir(), ".social-poster");
const TEST_CONFIG_FILE = path.join(TEST_CONFIG_DIR, "config.json");

// Helper to mock config
function mockConfig(startDate) {
  if (!fs.existsSync(TEST_CONFIG_DIR)) {
    fs.mkdirSync(TEST_CONFIG_DIR, { recursive: true });
  }
  const config = {
    schedulerDays: {
      startDate: startDate,
      daysUsed: 0,
    },
    // Required fields to prevent loadConfig errors
    monthlyCounter: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      count: 0,
    },
    dailyCounter: {
      date: new Date().toISOString().split("T")[0],
      count: 0,
    },
  };
  fs.writeFileSync(TEST_CONFIG_FILE, JSON.stringify(config));
}

console.log("🧪 Starting Scheduler Logic Tests...\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`❌ ${name}`);
    console.error(e.message);
    failed++;
  }
}

// 1. Test parseTime
test("parseTime handles AM/PM correctly", () => {
  const t1 = parseTime("9:30 AM");
  assert.deepStrictEqual(t1, { hour: 9, minute: 30 });

  const t2 = parseTime("2:15 PM");
  assert.deepStrictEqual(t2, { hour: 14, minute: 15 });

  const t3 = parseTime("12:00 PM"); // Noon
  assert.deepStrictEqual(t3, { hour: 12, minute: 0 });

  const t4 = parseTime("12:00 AM"); // Midnight
  assert.deepStrictEqual(t4, { hour: 0, minute: 0 });
});

test("parseTime handles 24-hour format", () => {
  const t1 = parseTime("14:30");
  assert.deepStrictEqual(t1, { hour: 14, minute: 30 });

  const t2 = parseTime("00:00");
  assert.deepStrictEqual(t2, { hour: 0, minute: 0 });
});

test("parseTime throws on invalid time", () => {
  assert.throws(() => parseTime("25:00"), /Hour must be between/);
  assert.throws(() => parseTime("12:60"), /Minutes must be between/);
  assert.throws(() => parseTime("invalid"), /Invalid time format/);
});

// 2. Test calculatePostDays
test("calculatePostDays returns correct cron patterns", () => {
  assert.strictEqual(calculatePostDays(1), "1");
  assert.strictEqual(calculatePostDays(3), "1,3,5");
  assert.strictEqual(calculatePostDays(5), "1,2,3,4,5");
  assert.strictEqual(calculatePostDays(7), "*");
});

// 3. Test checkSchedulerDays (Mocking date)
test("checkSchedulerDays logic check", () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Case 1: Started today (0 days diff) -> Should be allowed
  mockConfig(todayStr);
  let result = checkSchedulerDays();
  assert.strictEqual(result.allowed, true, "Day 0 should be allowed");
  assert.strictEqual(result.daysUsed, 0);

  // Case 2: Started 5 days ago (Day 6 of usage? 0,1,2,3,4,5)
  // If limit is 5 days, days 0-4 are valid. Day 5 is the 6th day.
  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);
  mockConfig(fiveDaysAgo.toISOString().split("T")[0]);

  result = checkSchedulerDays();
  // Current implementation allows up to day 5 (daysDiff < 6)
  // If requirement is strictly "5 days", then daysDiff=5 should be blocked?
  // Let's print what it does
  if (result.allowed) {
    console.warn(
      "   ⚠️  checkSchedulerDays allows 6th day (diff=5). Is this intended?",
    );
  } else {
    console.log("   checkSchedulerDays blocks 6th day.");
  }

  // Case 3: Started 6 days ago -> Should be blocked
  const sixDaysAgo = new Date(today);
  sixDaysAgo.setDate(today.getDate() - 6);
  mockConfig(sixDaysAgo.toISOString().split("T")[0]);

  result = checkSchedulerDays();
  assert.strictEqual(result.allowed, false, "Day 6 (diff=6) must be blocked");
  assert.strictEqual(result.needsReconfigure, true);
});

console.log(`\nTests Completed: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);
