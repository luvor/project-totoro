import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

async function readJson(filePath) {
  const source = await readFile(path.join(root, filePath), "utf8");
  return JSON.parse(source);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertUniqueIds(records, label) {
  const ids = new Set();

  for (const record of records) {
    assert(typeof record.id === "string" && record.id.length > 0, `${label}: missing id`);
    assert(!ids.has(record.id), `${label}: duplicate id "${record.id}"`);
    ids.add(record.id);
  }
}

function assertSources(records, sourceIds, label) {
  for (const record of records) {
    if (!("sourceIds" in record)) {
      continue;
    }

    for (const sourceId of record.sourceIds) {
      assert(sourceIds.has(sourceId), `${label}: unknown source "${sourceId}" in "${record.id}"`);
    }
  }
}

function assertFields(records, fields, label) {
  for (const record of records) {
    for (const field of fields) {
      assert(record[field] !== undefined && record[field] !== null && record[field] !== "", `${label}: "${record.id}" missing "${field}"`);
    }
  }
}

async function main() {
  const [sources, claims, metrics, machines, personas, rules, variants, districts] = await Promise.all([
    readJson("content/sources.json"),
    readJson("content/claims.json"),
    readJson("content/metrics.json"),
    readJson("content/machines.json"),
    readJson("content/personas.json"),
    readJson("content/rules.json"),
    readJson("content/variants.json"),
    readJson("content/districts.json")
  ]);

  const sourceIds = new Set(sources.map((source) => source.id));
  const district = districts.flagshipDistrict;

  assert(Array.isArray(sources), "sources.json must be an array");
  assert(Array.isArray(claims), "claims.json must be an array");
  assert(Array.isArray(metrics), "metrics.json must be an array");
  assert(Array.isArray(machines), "machines.json must be an array");
  assert(Array.isArray(personas), "personas.json must be an array");
  assert(Array.isArray(rules), "rules.json must be an array");
  assert(Array.isArray(variants), "variants.json must be an array");
  assert(district && typeof district === "object", "districts.json must contain flagshipDistrict");

  assertUniqueIds(sources, "sources");
  assertUniqueIds(claims, "claims");
  assertUniqueIds(metrics, "metrics");
  assertUniqueIds(machines, "machines");
  assertUniqueIds(personas, "personas");
  assertUniqueIds(rules, "rules");
  assertUniqueIds(variants, "variants");
  assertUniqueIds(district.quarters, "quarters");
  assertUniqueIds(district.climateModes, "climate modes");
  assertUniqueIds(district.phases, "phases");
  assertUniqueIds(district.riskScenarios, "risk scenarios");
  assertUniqueIds(district.flourishingSystems, "flourishing systems");

  assertFields(sources, ["title", "url", "note"], "sources");
  assertFields(claims, ["title", "text", "status", "confidence", "whyItMatters", "limits"], "claims");
  assertFields(metrics, ["theme", "label", "value", "status", "confidence", "formula", "owner"], "metrics");
  assertFields(machines, ["title", "summary", "winterMode", "shoulderMode", "summerMode", "failureMode"], "machines");
  assertFields(personas, ["name", "summary"], "personas");
  assertFields(rules, ["title", "cannotDo", "mustDo", "why", "metric", "tradeoff", "failureMode"], "rules");
  assertFields(variants, ["title", "population", "area", "coreIdea", "costPosition"], "variants");

  assertSources(claims, sourceIds, "claims");
  assertSources(metrics, sourceIds, "metrics");
  assertSources(machines, sourceIds, "machines");
  assertSources(variants, sourceIds, "variants");

  assert(Array.isArray(district.whyReal) && district.whyReal.length >= 3, "district: whyReal must have at least 3 bullets");
  assert(Array.isArray(district.promises) && district.promises.length >= 5, "district: promises must have at least 5 entries");
  assert(Array.isArray(district.failureReasons) && district.failureReasons.length >= 4, "district: failureReasons must have at least 4 entries");
  assert(Array.isArray(district.summerStrategies) && district.summerStrategies.length >= 3, "district: summerStrategies must have at least 3 entries");
  assert(Array.isArray(district.quarters) && district.quarters.length === 6, "district: expected exactly 6 quarters");

  for (const persona of personas) {
    assert(persona.seasonRoutes?.winter, `personas: "${persona.id}" missing winter route`);
    assert(persona.seasonRoutes?.summer, `personas: "${persona.id}" missing summer route`);
  }

  for (const machine of machines) {
    if (!machine.summerStates) {
      continue;
    }

    assert(Array.isArray(machine.summerStates) && machine.summerStates.length >= 3, `machines: "${machine.id}" must have at least 3 summerStates`);
    assertUniqueIds(machine.summerStates, `machines:${machine.id}:summerStates`);
  }

  console.log("Atlas content check passed");
  console.log(`sources=${sources.length} claims=${claims.length} metrics=${metrics.length} variants=${variants.length} machines=${machines.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
