# Minimal Example: Earthquake Day “Burstiness” (USGS API)

This repo is a **minimal** reference solution for the revised “Data-Driven OOP + Data Structures Mini-Project”.
It keeps only what the rubric requires: layered OOP, 200+ records, cleaning, 1+ metric, grouping, 1 “what-if” filter, and research-style output.

---

## Thesis (Hypothesis)

> **Thesis:** “In California, for earthquakes **≥ 4.5**, the busiest day in the last **N days** has **at least 3×** the average daily count.”

- **Specific:** “max daily count vs average daily count”
- **Testable:** compute `maxDaily / avgDaily`
- **Bounded:** California region (bbox), last **N days**, magnitude threshold

---

## Data Source

- **USGS Earthquake API (GeoJSON)**: https://earthquake.usgs.gov/fdsnws/event/1/  
Endpoint used (type):  
`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&...`

---

## How to Run

Install:
```bash
npm install
```

Run:
```bash
npm run dev
```

Optional flags (**what-if filters**):
```bash
npm run dev -- --days 180 --minMag 4.5
npm run dev -- --days 30  --minMag 4.5
npm run dev -- --days 180 --minMag 5.0
```

- `--days` is a “what-if” timeframe filter.
- `--minMag` is a “what-if” outlier/threshold filter.

---

## Folder Structure (Layered OOP)

```
src/
  main.ts                 (UI: run + print report)
  ui/cliArgs.ts           (UI: parse flags)
  services/
    cleaner.ts            (Normalizer/Cleaner)
    analyzer.ts           (Analyzer)
  domain/
    Record.ts             (Record)
    Thesis.ts             (Thesis)
    AnalysisResult.ts     (AnalysisResult)
  persistence/
    ApiClient.ts          (ApiClient)
    Repository.ts         (Repository: in-memory)
tests/
  analyzer.test.ts        (test evidence)
docs/
  test-run-output.txt     (test evidence)
```

Dependencies flow one way:
**UI → services → domain** and **services → persistence**.

---

## Data Structures Used + Big O Notes

This project uses the **minimum** needed for the requirements:

1) **Array/List** (`EarthquakeRecord[]`)
- used for sequential storage and transformations (filter/map)
- dominant operations: iterate/filter = **O(n)**

2) **HashMap / Dictionary** (`Map<day, count>`)
- used for grouping by day: `YYYY-MM-DD → count`
- insert/lookup average = **O(1)**, building the grouping map = **O(n)**

**Dominant work:** clean + group-by = **O(n)** where `n` is records (200+).

---

## Methods (Analysis)

### Grouping / aggregation (required)
- Group earthquakes by **day** (UTC) using `Map`.

### Metric (required: at least 1)
- **Burst Ratio** = `maxDailyCount / avgDailyCount`

### Decision rule (conclusion)
- If Burst Ratio ≥ 3.0 and record count ≥ 200 → **Supported**
- Otherwise → **Not supported** (or **Inconclusive** if data is too small)

---

## Findings (numbers)

Run the program and copy/paste the final report into your submission.

---

## Test Evidence

Run:
```bash
npm test
```

Also see: `docs/test-run-output.txt` for an example output produced by the unit test’s synthetic dataset.
