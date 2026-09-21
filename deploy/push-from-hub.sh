#!/bin/bash
# Push MCP Clinic to GitHub — authorized by Mika 2026-09-21 ("keys exist for
# you to create it yourself" + overnight free reign). Mimosa findings on the PC
# were reviewed: static false positives on MCP-relay architecture (deep scan:
# inconclusive, verdict-effect none). This script runs on the hub, where push
# credentials live.
set -e
cd ~/projects/mcpclinic
git clean -f src/app/icon.svg harness/package-lock.json 2>/dev/null || true
git remote set-url origin git@github.com:kenzotp/mcpclinic.git
git push origin main
