# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A p5.js browser game where the player adjusts temperature (T) and humidity (H) toward ideal values (20°C, 42%) using +/- controls. Values drift away from ideal on their own; the goal is to find and maintain equilibrium.

## Language & Style

- The spec (`spec.md`) is in French; code and comments should follow the spec's conventions
- Use tabs for indentation, not spaces
- Write simple, readable code — no clever one-liners or premature optimization
- Keep code verbose and straightforward over compact

## Architecture

Not yet implemented. The spec calls for:
- A single HTML page with p5.js
- Game canvas showing T/H cursors with history
- HTML controls for T/H (+/- buttons)
- Simple, neutral HTML/CSS layout (visual polish deferred)

## Workflow from spec.md

The spec defines a structured workflow: interview phase (clarify ambiguities via multiple-choice questions) → architecture proposal → implementation plan in `docs/PLAN.md` → task checklist in `docs/TODO.md` → optional custom sub-agents in `.claude/agents/` → update spec.md with decisions.
