---
description: Orchestrate full SpecKit Plus workflow for Python chapters (12-29). Automatically chains /sp.specify → /sp.plan → /sp.tasks with approval gates. Students learn Python through AIDD thinking.
---

# /sp.python-chapter: Orchestrated Python Chapter Workflow

**Purpose**: Design a complete Python chapter (12-29) using AIDD principles. Automatically orchestrates the full SpecKit Plus SDD workflow (Spec → Plan → Tasks) with human approval checkpoints.

**Usage**:
```
/sp.python-chapter [chapter-number]
```

**Example**:
```
/sp.python-chapter 13
```

---

## ORCHESTRATED WORKFLOW (What Actually Happens)

When you run `/sp.python-chapter [N]`:

### PHASE 0: Context Gathering (Interactive)

1. **Validate chapter**: Read `specs/book/chapter-index.md` and extract chapter title
2. **Ask 4 questions**:
   - Who are we teaching? (audience)
   - What's the core focus for THIS chapter? (scope)
   - What can students BUILD? (outcome)
   - Which context aspects fit? (materials)
3. **Store responses** for next phases

### PHASE 1: Specification (Automated)

```
→ Invoke: /sp.specify [chapter-context]
  ├─ Pass: chapter number, title, user answers, context materials
  ├─ /sp.specify creates: specs/part-5-chapter-[N]/spec.md
  └─ Return to user: "Spec created. Review and approve."

WAIT: User replies "✅ Spec approved" or provides feedback
→ If feedback: Update spec.md iteratively
→ If approved: Continue to PHASE 2
```

### PHASE 2: Planning (Automated)

```
→ Invoke: /sp.plan [spec-context]
  ├─ Read: specs/part-5-chapter-[N]/spec.md
  ├─ /sp.plan creates: specs/part-5-chapter-[N]/plan.md
  └─ Return to user: "Plan created. Review and approve."

WAIT: User replies "✅ Plan approved" or provides feedback
→ If feedback: Update plan.md iteratively
→ If approved: Continue to PHASE 3
```

### PHASE 3: Tasks (Automated)

```
→ Invoke: /sp.tasks [spec+plan-context]
  ├─ Read: specs/part-5-chapter-[N]/spec.md and plan.md
  ├─ /sp.tasks creates: specs/part-5-chapter-[N]/tasks.md
  └─ Return to user: "Tasks created. Review and approve."

WAIT: User replies "✅ Tasks approved" or provides feedback
→ If feedback: Update tasks.md iteratively
→ If approved: Continue to PHASE 4
```

### PHASE 4: Implementation (Optional)

```
→ Ask user: "Ready to implement lesson content?"

Options:
A) "Implement with lesson-writer subagent"
   → Invoke: lesson-writer subagent
   → Pass: spec.md, plan.md, tasks.md
   → Creates: docs/part-5/chapter-[N]/{01,02,03,04}-lesson-*.md

B) "Manual implementation"
   → User implements using tasks.md as checklist

C) "Done for now"
   → Keep design files, skip implementation

→ Report final status
```

---

## KEY PRINCIPLES (Always Applied)

### ✅ AIDD-First
- Reinforce specification-first thinking from Chapters 1-11
- Validation-first practice: "How will students test understanding?"
- AI partnership: "How will they use Claude Code/Gemini CLI?"

### ✅ No Forward References
- Zero mentions of Chapters 30+ (SDD taught later)
- No concepts from future chapters
- Chapter title from `chapter-index.md` is the absolute anchor

### ✅ Honors User Intent
- User's audience choice = final decision (never override)
- User's scope answer = limits concepts (never expand)
- User's outcome answer = determines lessons (never modify)

### ✅ Ruthless Context Filtering
- Only extract context matching THIS chapter's title
- Skip concepts from future chapters (even if in materials)
- Skip advanced variations and tangential concepts
- Example: Chapter 13 (Intro) skips Functions/Classes/Async

### ✅ Cognitive Load Limits
- Max 5 concepts for beginner (Ch 12-16)
- Max 7 concepts for intermediate (Ch 17-23)
- Max 10 concepts for advanced (Ch 24-29)

---

## EXECUTION INSTRUCTIONS (For Claude Code)

The command must implement this workflow:

```python
# MAIN EXECUTION FUNCTION

def sp_python_chapter(chapter_num):
    # PHASE 0: Validation & Context Gathering
    chapter_title = validate_and_read_chapter(chapter_num)  # 12-29

    user_context = ask_user_four_questions(chapter_num, chapter_title)
    # Stores: audience, core_focus, outcome, context_materials

    # PHASE 1: Specification (AUTOMATED)
    spec_context = prepare_context(
        chapter_num, chapter_title, user_context
    )

    SlashCommand.invoke("/sp.specify", context=spec_context)
    # → Creates: specs/part-5-chapter-{N}/spec.md

    print("📋 Spec created: specs/part-5-chapter-{N}/spec.md")
    print("Please review and confirm: '✅ Spec approved' or feedback")

    wait_for_approval()  # Blocks until user confirms

    # PHASE 2: Planning (AUTOMATED)
    spec_content = Read(f"specs/part-5-chapter-{N}/spec.md")
    plan_context = prepare_context(
        chapter_num, chapter_title, spec_content
    )

    SlashCommand.invoke("/sp.plan", context=plan_context)
    # → Creates: specs/part-5-chapter-{N}/plan.md

    print("📋 Plan created: specs/part-5-chapter-{N}/plan.md")
    print("Please review and confirm: '✅ Plan approved' or feedback")

    wait_for_approval()  # Blocks until user confirms

    # PHASE 3: Tasks (AUTOMATED)
    plan_content = Read(f"specs/part-5-chapter-{N}/plan.md")
    tasks_context = prepare_context(
        chapter_num, chapter_title, spec_content, plan_content
    )

    SlashCommand.invoke("/sp.tasks", context=tasks_context)
    # → Creates: specs/part-5-chapter-{N}/tasks.md

    print("📋 Tasks created: specs/part-5-chapter-{N}/tasks.md")
    print("Please review and confirm: '✅ Tasks approved' or feedback")

    wait_for_approval()  # Blocks until user confirms

    # PHASE 4: Implementation (OPTIONAL)
    print("\n✅ All 3 design artifacts complete!")
    print(f"  - specs/part-5-chapter-{N}/spec.md")
    print(f"  - specs/part-5-chapter-{N}/plan.md")
    print(f"  - specs/part-5-chapter-{N}/tasks.md")

    choice = ask_user([
        "A) Implement with lesson-writer subagent",
        "B) Manual implementation",
        "C) Done for now"
    ])

    if choice == "A":
        tasks_content = Read(f"specs/part-5-chapter-{N}/tasks.md")
        Task.invoke(
            subagent_type="lesson-writer",
            prompt=prepare_lesson_writer_prompt(
                spec_content, plan_content, tasks_content
            )
        )
        # → Creates: docs/part-5/chapter-{N}/*-lesson-*.md

    # Final Report
    report_completion(chapter_num)
```

---

## CRITICAL VALIDATION (Before Each Phase)

**PHASE 1 Validation** (before `/sp.specify`):
- ✅ Chapter number valid (12-29)
- ✅ Chapter title matches `chapter-index.md`
- ✅ User's audience answer captured
- ✅ User's scope answer captured
- ✅ User's outcome answer captured
- ✅ Context will be ruthlessly filtered

**PHASE 2 Validation** (before `/sp.plan`):
- ✅ spec.md was created successfully
- ✅ Concept count ≤ tier limit (5/7/10)
- ✅ No forward references (Chapters 30+)
- ✅ No methodology names (except AIDD for reinforcement)
- ✅ Only Chapters 1-N are prerequisites

**PHASE 3 Validation** (before `/sp.tasks`):
- ✅ plan.md was created successfully
- ✅ Lessons match spec's learning objectives
- ✅ Proficiency levels assigned (CEFR)
- ✅ AI prompts specified for each lesson

**PHASE 4 Validation** (before lesson-writer):
- ✅ All 3 design files exist and are valid
- ✅ User chose implementation option
- ✅ Context filtered ruthlessly
- ✅ Ready for lesson content creation

---

## WHAT GETS CREATED

**By End of PHASE 3** (mandatory):
```
specs/part-5-chapter-[N]/
  ├── spec.md       (What students learn)
  ├── plan.md       (How we teach it, lesson-by-lesson)
  └── tasks.md      (Implementation checklist)
```

**By End of PHASE 4** (if Option A chosen):
```
docs/part-5/chapter-[N]/
  ├── 01-lesson-1-[topic].md
  ├── 02-lesson-2-[topic].md
  ├── 03-lesson-3-[topic].md
  ├── 04-lesson-4-[topic].md (or more, based on plan)
  └── index.md (auto-generated TOC)
```

---

## EXAMPLE EXECUTION (What User Sees)

```
> /sp.python-chapter 13

⏺ PHASE 0: Context Gathering

Chapter 13: "Introduction to Python" (Part 5)
Prerequisites: Chapters 1-12 (AIDD + Tools + Markdown)

Q1: Who are we teaching?
    → Absolute beginners / Professionals transitioning to AI-native / Both?
[User answers]

Q2: Core focus for THIS chapter?
    → Intro + setup + first program / Execution model / Something else?
[User answers]

Q3: What will students BUILD?
    → Hello World / Interactive program / Real project?
[User answers]

Q4: Which context aspects from materials?
    → Use existing lessons / Start fresh / Hybrid?
[User answers]

✅ Context gathered. Moving to PHASE 1...

---

⏺ PHASE 1: Specification (Automated)

Invoking: /sp.specify with your context...

[/sp.specify generates spec.md]

📋 Spec created: specs/part-5-chapter-13/spec.md

Please review the specification:
- Does this match your vision?
- Are learning objectives clear?
- Is scope appropriate (not too broad)?

Reply with: "✅ Spec approved" or provide feedback

[User: ✅ Spec approved]

✅ Spec approved. Moving to PHASE 2...

---

⏺ PHASE 2: Planning (Automated)

Invoking: /sp.plan with approved spec...

[/sp.plan generates plan.md]

📋 Plan created: specs/part-5-chapter-13/plan.md

Please review the lesson breakdown:
- Are 4 lessons appropriate for this chapter?
- Are AI prompts specified for each lesson?
- Are CEFR proficiency levels correct?

Reply with: "✅ Plan approved" or provide feedback

[User: ✅ Plan approved]

✅ Plan approved. Moving to PHASE 3...

---

⏺ PHASE 3: Tasks (Automated)

Invoking: /sp.tasks with spec + plan...

[/sp.tasks generates tasks.md]

📋 Tasks created: specs/part-5-chapter-13/tasks.md

Please review the implementation checklist:
- Are acceptance criteria clear?
- Are validation steps included?
- Are all lesson phases covered?

Reply with: "✅ Tasks approved" or provide feedback

[User: ✅ Tasks approved]

✅ Tasks approved. Moving to PHASE 4...

---

⏺ PHASE 4: Implementation (Optional)

All design artifacts complete:
  ✅ specs/part-5-chapter-13/spec.md
  ✅ specs/part-5-chapter-13/plan.md
  ✅ specs/part-5-chapter-13/tasks.md

Ready to implement lesson content?

A) Implement with lesson-writer subagent
   → Automatically creates lesson .md files
B) Manual implementation
   → You create lessons using tasks.md as guide
C) Done for now
   → Keep design files, implement later

[User chooses option]

If A: Invoking lesson-writer subagent...
If B: Ready for manual implementation
If C: All design artifacts preserved for later

---

✅ WORKFLOW COMPLETE

Chapter 13 design package ready:
  ✅ Specification (what to teach)
  ✅ Lesson Plan (how to teach)
  ✅ Implementation Tasks (checklist)
  ✅ Optional: Lesson content (if implemented)

Next: Share with technical-reviewer for validation
```

---

## CRITICAL SUCCESS FACTORS

1. **Automatic Invocation**: `/sp.specify`, `/sp.plan`, `/sp.tasks` must be invoked automatically via SlashCommand tool, not manually by user

2. **Approval Gates**: User must explicitly approve each phase ("✅ Approved") before proceeding to next

3. **Context Preservation**: Each phase receives full context from previous phases (spec → plan → tasks)

4. **Ruthless Filtering**: Context extraction must skip any concepts from future chapters, even if present in materials

5. **User Authority**: User's answers to 4 questions are final — never override with assumptions

6. **Compliance**: Every phase validates against acceptance criteria before proceeding

---

## REFERENCES

- **Chapter Index**: `specs/book/chapter-index.md` (Part 5 Quick Lookup: Chapters 12-29)
- **Constitution**: `.specify/memory/constitution.md` (AIDD principles, domain skills)
- **Design Template**: `.specify/templates/book/PYTHON_CHAPTER_DESIGN_TEMPLATE.md`
- **Sample Input**: `.claude/commands/sp.python-chapter.SAMPLE_INPUT.md`
- **Context Materials**: `context/13_chap12_to_29_specs/` (Lesson files, teaching examples)

---

## ONE COMMAND. FULL WORKFLOW. READY TO IMPLEMENT.

Run `/sp.python-chapter [N]` and the system orchestrates the complete SpecKit Plus loop automatically, with your approval at each gate.
