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
echo "[1/4] Rendering HeroLoop MP4..."
npx remotion render "$SCRIPT_DIR/src/index.ts" HeroLoop "$OUTPUT_DIR/hero-loop.mp4" \
  --codec h264 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo "[2/4] Rendering HeroLoop poster frame..."
npx remotion still "$SCRIPT_DIR/src/index.ts" HeroLoop "$OUTPUT_DIR/hero-loop-poster.webp" \
  --frame 45 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

# Render PricingExplainer video (15s @ 30fps = 450 frames)
echo "[3/4] Rendering PricingExplainer MP4..."
npx remotion render "$SCRIPT_DIR/src/index.ts" PricingExplainer "$OUTPUT_DIR/pricing-explainer.mp4" \
  --codec h264 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo "[4/4] Rendering PricingExplainer poster frame..."
npx remotion still "$SCRIPT_DIR/src/index.ts" PricingExplainer "$OUTPUT_DIR/pricing-explainer-poster.webp" \
  --frame 300 \
  --config "$SCRIPT_DIR/remotion.config.ts" \
  2>&1

echo ""
echo "=== Rendering complete ==="
ls -lh "$OUTPUT_DIR"
