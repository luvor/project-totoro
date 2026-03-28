#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$PROJECT_ROOT/public/videos"

mkdir -p "$OUTPUT_DIR"

echo "=== Remotion Video Rendering ==="
echo "Output directory: $OUTPUT_DIR"
echo ""

# Render HeroLoop video (10s @ 30fps = 300 frames)
echo "[1/10] Rendering HeroLoop MP4..."
npx remotion render "$SCRIPT_DIR/src/index.ts" HeroLoop "$OUTPUT_DIR/hero-loop.mp4" \
  --codec h264 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo "[2/10] Rendering HeroLoop poster frame..."
npx remotion still "$SCRIPT_DIR/src/index.ts" HeroLoop "$OUTPUT_DIR/hero-loop-poster.webp" \
  --frame 45 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

# Render PricingExplainer video (15s @ 30fps = 450 frames)
echo "[3/10] Rendering PricingExplainer MP4..."
npx remotion render "$SCRIPT_DIR/src/index.ts" PricingExplainer "$OUTPUT_DIR/pricing-explainer.mp4" \
  --codec h264 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo "[4/10] Rendering PricingExplainer poster frame..."
npx remotion still "$SCRIPT_DIR/src/index.ts" PricingExplainer "$OUTPUT_DIR/pricing-explainer-poster.webp" \
  --frame 300 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

# Render MasterplanOverview video (10s @ 30fps = 300 frames)
echo "[5/10] Rendering MasterplanOverview MP4..."
npx remotion render "$SCRIPT_DIR/src/index.ts" MasterplanOverview "$OUTPUT_DIR/masterplan-overview.mp4" \
  --codec h264 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo "[6/10] Rendering MasterplanOverview still..."
npx remotion still "$SCRIPT_DIR/src/index.ts" MasterplanStill "$OUTPUT_DIR/masterplan-still.webp" \
  --frame 250 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

# Render MachineScenarios video (15s @ 30fps = 450 frames)
echo "[7/10] Rendering MachineScenarios MP4..."
npx remotion render "$SCRIPT_DIR/src/index.ts" MachineScenarios "$OUTPUT_DIR/machine-scenarios.mp4" \
  --codec h264 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo "[8/10] Rendering MachineScenarios still..."
npx remotion still "$SCRIPT_DIR/src/index.ts" MachineScenariosStill "$OUTPUT_DIR/machine-scenarios-still.webp" \
  --frame 420 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

# Render DistrictMetrics video (9s @ 30fps = 270 frames)
echo "[9/10] Rendering DistrictMetrics MP4..."
npx remotion render "$SCRIPT_DIR/src/index.ts" DistrictMetrics "$OUTPUT_DIR/district-metrics.mp4" \
  --codec h264 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo "[10/10] Rendering DistrictMetrics still..."
npx remotion still "$SCRIPT_DIR/src/index.ts" DistrictMetricsStill "$OUTPUT_DIR/district-metrics-still.webp" \
  --frame 220 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo ""
echo "=== Rendering complete ==="
ls -lh "$OUTPUT_DIR"
