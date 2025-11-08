---
title: "Capstone Project – Personal Information Collector"
chapter: 13
lesson: 5
duration_minutes: 90

# HIDDEN SKILLS METADATA (Institutional Integration Layer)
skills:
  - name: "Integration of All Concepts"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student builds a complete program using variables, type hints, input(), type conversion, f-strings, and validation"

  - name: "Specification-First Thinking"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Create"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student designs program specification before coding; validates that implementation matches specification"

  - name: "Program Testing and Validation"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student tests program with multiple inputs; validates output; handles edge cases"

  - name: "AI-Assisted Code Review"
    proficiency_level: "B1"
    category: "Soft"
    bloom_level: "Apply"
    digcomp_area: "Communication & Collaboration"
    measurable_at_this_level: "Student submits code for AI review; interprets feedback; makes improvements"

learning_objectives:
  - objective: "Build an interactive program that demonstrates all Chapter 13 concepts"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Complete working capstone program that meets all requirements"

  - objective: "Apply specification-first thinking to program design"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Student describes program design in plain English before coding"

cognitive_load:
  new_concepts: 0
  assessment: "Capstone integrates all prior concepts (variables, type hints, input(), type conversion, isinstance(), f-strings, print(), comments) with no new concepts introduced ✓"

differentiation:
  extension_for_advanced: "Add data validation for all inputs; implement multiple rounds of data collection; save user data to a file"
  remedial_for_struggling: "Use provided code template; complete step-by-step with scaffolding; focus on running working code first, improvements later"

# Generation metadata
generated_by: "lesson-writer v3.0.0"
source_spec: "specs/016-part-4-chapter-13/spec.md"
created: "2025-11-09"
last_modified: "2025-11-09"
git_author: "Claude Code"
workflow: "/sp.implement"
version: "1.0.0"
---

# Capstone Project – Personal Information Collector

Congratulations. Over the last four lessons, you've learned the foundations of Python:

- **Lesson 1**: What Python is and why it matters
- **Lesson 2**: How to install it on your computer
- **Lesson 3**: How to create variables with type hints
- **Lesson 4**: How to write programs with proper syntax

Now it's time to bring all these pieces together. Your capstone project is to build a real, working Python program that collects user information and displays a summary. This is where you transition from learning individual concepts to **integrating them into a complete solution.**

## Understanding the Capstone

Your mission: **Build an interactive program that asks users for personal information, validates it, and displays a formatted summary.**

This project applies the core methodology of AI-Driven Development: **describe intent first, code second, validate third.**

Here's the process you'll follow:

1. **Design** – Describe what your program will do (in plain English, not code)
2. **Build** – Write the Python code using concepts from Lessons 1-4
3. **Test** – Run the program, try different inputs, verify it works
4. **Reflect** – Explain what you built and how it works

This mirrors the specification-first approach you'll master in Part 5.

## Program Design – Before You Code

Before writing a single line of Python, **describe your program in plain English.**

Ask yourself:
- **What will the program do?** (Collect personal information and display it)
- **What input does it need?** (At least 3 pieces of information from the user)
- **What output should it show?** (A formatted summary of the information)
- **What could go wrong?** (User enters non-numeric age; validation is needed)

Write a brief design document:

```
Program Name: Personal Information Collector

Purpose:
Ask users for their personal information (name, age, favorite color)
and display a formatted summary.

Input Needed:
1. User's name (text)
2. User's age (number)
3. User's favorite color (text)

Processing:
1. Collect each piece of information from user
2. Convert age from text to number
3. Validate that age is a positive integer
4. Create formatted output

Output:
Display a summary showing the user's name, age, and favorite color
in a readable format.

Edge Cases:
- What if user enters non-numeric age? (Handle gracefully)
- What if age is negative? (Flag as invalid)
```

Now, ask your AI:

#### 🚀 CoLearning Challenge

Before you code, validate your design:

> "Here's my program design: [paste your design document above]

Before I start coding, does this make sense? Should I change anything?
Is this scope reasonable for a beginner Python program?"

Your AI will review your design and provide feedback. This teaches you **specification-first thinking**—the core skill of AI-Driven Development. You plan before you code, not the other way around.

## Step-by-Step Build

Now let's build your program. I'll provide a working template you can use as a starting point, then we'll break it down step by step.

### Working Template

Here's a complete, tested program you can run:

```python
# Personal Information Collector
# This program asks user for their info and displays a summary

# ===== COLLECT INFORMATION =====
print("=== Personal Information Collector ===\n")

name: str = input("What is your name? ")
age_str: str = input("How old are you? ")
favorite_color: str = input("What is your favorite color? ")

# ===== VALIDATE AND CONVERT =====
# input() always returns a string, so we convert age to integer
age: int = int(age_str)

# Check if age is valid (should be positive integer)
is_age_valid: bool = isinstance(age, int) and age > 0

# ===== DISPLAY SUMMARY =====
print("\n=== Your Profile ===")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Favorite Color: {favorite_color}")
print(f"Age Valid: {is_age_valid}")

print(f"\nThank you, {name}! Your information has been recorded.")
```

**Save this as** `capstone.py` and run:
```bash
python capstone.py
```

**Sample run:**
```
=== Personal Information Collector ===

What is your name? Alice
How old are you? 25
What is your favorite color? Blue

=== Your Profile ===
Name: Alice
Age: 25
Favorite Color: Blue
Age Valid: True

Thank you, Alice! Your information has been recorded.
```

### Breaking Down the Template

Let's understand each part:

**Section 1: Collect Information**

```python
name: str = input("What is your name? ")
age_str: str = input("How old are you? ")
favorite_color: str = input("What is your favorite color? ")
```

The `input()` function pauses the program, displays a prompt, and waits for the user to type something. Whatever the user types is stored in the variable.

**Important**: `input()` always returns a **string** (text). Even if the user types "25", it's stored as the text "25", not the number 25.

**Section 2: Validate and Convert**

```python
age: int = int(age_str)
```

`int(age_str)` converts the text "25" into the actual number 25. This is **type conversion**.

```python
is_age_valid: bool = isinstance(age, int) and age > 0
```

`isinstance(age, int)` checks "is age actually an integer?" and `age > 0` checks "is age positive?" The `and` combines both checks (both must be true).

**Section 3: Display Summary**

```python
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Favorite Color: {favorite_color}")
```

F-strings display the collected information in a readable format.

#### 💬 AI Colearning Prompt

Once you have the program running, ask your AI:

> "Here's my capstone program: [paste your code]

Can you review it? Specifically:
1. Are all variables properly typed with type hints?
2. Does the output format look good?
3. Any security or error-handling improvements?
4. Can you suggest one enhancement?"

This teaches professional code review—you submit work to AI, interpret feedback, and make improvements. This is how development teams work in the real world.

## Testing and Validation

A working program must be tested. Run your capstone multiple times with different inputs:

**Test 1: Normal case**
```
Name: Alice
Age: 25
Color: Blue
```
Expected: Displays all information correctly, age valid = True

**Test 2: Edge case – zero age**
```
Name: Bob
Age: 0
Color: Red
```
Expected: Displays age as 0, but age valid = False (because 0 is not positive)

**Test 3: Edge case – negative age**
```
Name: Charlie
Age: -5
Color: Green
```
Expected: Displays age as -5, but age valid = False

Your program should handle all these cases without crashing.

#### ✨ Teaching Tips

- **Your program should run without crashing**: If the user enters something unexpected, the program should handle it gracefully (not crash).

- **Type hints on every variable**: You'll notice the template has type hints on ALL variables. Make this a habit—it's professional Python style.

- **Comments explain sections**: Notice the `# ===== COLLECT INFORMATION =====` comments. They help readers (including you in 3 months) understand program structure.

## Extending Your Program

Once your basic capstone works, extend it with new features:

**Extension 1: Add another field**

Add a question for favorite food, hobby, or something else important to you:

```python
favorite_food: str = input("What is your favorite food? ")
```

Then include it in the output:

```python
print(f"Favorite Food: {favorite_food}")
```

Test the extended program. Verify new output displays correctly.

**Extension 2: More validation**

Add validation for other fields. For example, check that name isn't empty:

```python
is_name_valid: bool = len(name) > 0
print(f"Name Valid: {is_name_valid}")
```

**Extension 3: Better error handling**

Currently, if the user enters "abc" when asked for age, the program crashes with a ValueError. Handle this gracefully (this is beyond beginner level but a great challenge if you're advanced).

## Integration: How This Uses All Lessons

This capstone integrates every concept from Chapter 13:

| Concept | How It's Used |
|---------|---------------|
| **What Is Python?** (Lesson 1) | You're now using Python to solve a real problem; you understand it's a tool for describing intent |
| **Installation** (Lesson 2) | Your installed Python runs this program |
| **Variables & Type Hints** (Lesson 3) | Every variable has a type hint: `name: str`, `age: int`, `is_age_valid: bool` |
| **Basic Syntax** (Lesson 4) | You use `print()`, f-strings, comments, proper structure, and `input()` |
| **AI Collaboration** (Throughout) | You'll ask AI for design feedback, code review, and troubleshooting |

This is **specification-first thinking in action**:
1. Understand the requirements (collect user info, display summary)
2. Design before coding (write what you'll build)
3. Build (write the code)
4. Validate (test it works)
5. Reflect (explain what you built and how it works)

## Common Mistakes to Avoid

**Mistake 1: Not using type hints on variables**

Wrong:
```python
name = input("What is your name? ")  # No type hint!
```

Right:
```python
name: str = input("What is your name? ")  # Clear intent
```

Every variable should have a type hint. This is how you describe intent.

---

**Mistake 2: Forgetting to convert age from string to integer**

Wrong:
```python
age: str = input("How old are you? ")
# age is still a string "25", not integer 25!
```

Right:
```python
age_str: str = input("How old are you? ")
age: int = int(age_str)  # Explicit conversion
```

`input()` returns a string. You must convert it.

---

**Mistake 3: Not validating input before using it**

Wrong:
```python
age_str: str = input("How old are you? ")
age: int = int(age_str)  # If user enters "abc", this crashes!
```

Better:
```python
age_str: str = input("How old are you? ")
age: int = int(age_str)
is_age_valid: bool = isinstance(age, int) and age > 0
# Now you can use is_age_valid to check before processing
```

Validation prevents crashes from unexpected input.

---

**Mistake 4: Unclear program flow**

Wrong:
```python
name: str = input("Name? ")
print(f"Name: {name}")
age_str: str = input("Age? ")
age: int = int(age_str)
print(f"Age: {age}")
# Jumbled, hard to follow
```

Right:
```python
# ===== COLLECT INFORMATION =====
name: str = input("What is your name? ")
age_str: str = input("How old are you? ")

# ===== CONVERT =====
age: int = int(age_str)

# ===== DISPLAY =====
print(f"Name: {name}")
print(f"Age: {age}")
```

Clear sections with comments make code understandable.

---

## Try With AI

Use Claude Code or Gemini CLI for this section.

**Prompt 1: Recall – Program Components (Bloom's Level 1: Remember)**

```
What are the main parts of your capstone program?

1. _______ (Ask user for data)
2. _______ (Check if data is valid)
3. _______ (Display formatted output)
4. _______ (Explain what the program does)

List them in the order your program executes them.
```

**Expected Outcome**: You'll recall program structure and demonstrate understanding of program flow.

---

**Prompt 2: Understand – Why Each Component Matters (Bloom's Level 2: Understand)**

```
Explain: "Why do we validate the age with isinstance()?"

What could go wrong if we skipped this check?

Ask your AI: "What's the difference between \`input()\` returning a string
vs. needing an integer? Why is conversion necessary?"
```

**Expected Outcome**: You'll understand why type conversion and validation matter. You'll grasp the distinction between input (always string) and type conversion.

---

**Prompt 3: Apply – Extend Your Program (Bloom's Level 3: Apply)**

```
Now that your capstone works, extend it:

- Add one more question (favorite food, hobby, hometown, etc.)
- Add it to your variables with type hint
- Include it in the output summary
- Test the program with multiple inputs

Ask your AI: "I added [new field] to my program: [paste code]
Does it look correct? Any improvements?"
```

**Expected Outcome**: You'll apply concepts to a novel variation. You'll practice independent implementation and gain confidence in your skills. You'll learn to extend working programs.

---

**Prompt 4: Reflect – Metacognitive Learning (Bloom's Level 4: Analyze/Create)**

```
Reflection questions (write your answers):

1. What was the hardest part about building this program? How did you solve it?
2. Where did you use your AI tool? Why was it helpful there?
3. If you were explaining this program to someone who's never coded,
   what would you emphasize?
4. How is this program an example of "describing intent first, coding second"?
5. What would you build next with Python? What would be the first step?

Ask your AI: "Here's my reflection on what I learned: [paste answers]
Do you have insights about my learning journey? What should I focus on next?"
```

**Expected Outcome**: You'll reflect on the learning process and articulate how specification precedes code. You'll demonstrate metacognitive awareness—thinking about how you think. You'll clarify your understanding of AIDD methodology. You'll identify your next learning steps. This provides cognitive closure for the entire chapter and prepares you for Part 5: Specification-Driven Development.

---

## Capstone Acceptance Criteria

Your capstone program must meet these criteria to be considered complete:

- [ ] Program runs without crashing when executed with `python capstone.py`
- [ ] Collects at least 3 pieces of user information (name, age, color)
- [ ] All variables have type hints
- [ ] Converts age from string to integer
- [ ] Uses `isinstance()` to validate age
- [ ] Uses f-strings for formatted output
- [ ] Includes comments explaining sections
- [ ] Displays information in readable format
- [ ] Demonstrates understanding of all Chapter 13 concepts
- [ ] You can explain how it works to someone else

---

## What's Next: Chapter 14

Your capstone demonstrates that you understand:
- How Python works
- How variables and type hints describe intent
- How to create programs and run them
- How to collaborate with AI

In **Chapter 14: Data Types**, you'll expand on the four types you learned here. You'll discover that Python has more than just int, str, float, and bool. You'll learn advanced type techniques that prepare you for building more complex programs.

But more importantly, in **Chapter 15** and beyond, you'll start learning **control flow**—making programs make decisions and repeat operations. That's where Python becomes truly powerful.

You've built the foundation. You're ready.

