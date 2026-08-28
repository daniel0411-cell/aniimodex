#!/usr/bin/env bash
# seo-indexing skill 依赖安装脚本
# 仅 gsc_indexing.py 需要 cryptography（用于 RS256 JWT 签名）
# check_sitemap.py 和 bing_submit.py 为纯标准库，无需任何第三方库

set -e

echo "=== 创建虚拟环境并安装依赖 ==="

# 在 skill 目录下创建 .venv
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VENV_DIR="$SKILL_DIR/.venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "[1/2] 创建虚拟环境：$VENV_DIR"
    python3 -m venv "$VENV_DIR"
fi

echo "[2/2] 激活虚拟环境并安装 cryptography"
source "$VENV_DIR/bin/activate"
pip install --upgrade pip >/dev/null
pip install -r "$SKILL_DIR/requirements.txt"

echo ""
echo "✅ 依赖安装完成。"
echo "运行 GSC 脚本时，使用该虚拟环境中的 python："
echo "    $VENV_DIR/bin/python scripts/gsc_indexing.py --help"
echo ""
echo "提示：check_sitemap.py 和 bing_submit.py 用系统 python3 即可运行，无需本虚拟环境。"
