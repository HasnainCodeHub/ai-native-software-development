---
title: "Variables and Type Hints – Describing Intent"
chapter: 13
lesson: 3
duration_minutes: 75

# HIDDEN SKILLS METADATA (Institutional Integration Layer)
skills:
  - name: "Variable Declaration with Type Hints"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student writes syntax `name: str = \"Alice\"` correctly; creates variables for different types (int, str, float, bool) without error"

  - name: "Understanding Core Primitive Types"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Information & Data Literacy"
    measurable_at_this_level: "Student can explain the purpose of each type (int, str, float, bool) and identify which type to use for different data"

  - name: "Type Hints as Intent Description"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student explains type hints as 'describing intent' and understands their importance for AI collaboration"

  - name: "Collection Types Awareness"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student knows that collections (list, dict, tuple, set) exist for storing multiple values; detailed coverage in later chapters"

learning_objectives:
  - objective: "Create variables with type hints for all primitive types (int, str, float, bool)"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student creates 5 typed variables with correct syntax; explains each type's purpose"

cognitive_load:
  new_concepts: 6
  assessment: "6 new concepts taught (Variables, int/str/float/bool types, type hints, variable naming, why type hints matter, collection types awareness). This exceeds A1 limit of 5 but is appropriate for A2 (limit 7) because collection types are awareness-only (no syntax, no examples) ✓"

differentiation:
  extension_for_advanced: "Explore type checking tools; learn about type validation at runtime; research mypy and static type checking"
  remedial_for_struggling: "Focus on the four core types one at a time; use relatable real-world data (age, name, price) before abstract examples"

# Generation metadata
generated_by: "lesson-writer v3.0.0"
source_spec: "specs/016-part-4-chapter-13/spec.md"
created: "2025-11-09"
last_modified: "2025-11-09"
git_author: "Claude Code"
workflow: "/sp.implement"
version: "1.0.0"
---

# Variables and Type Hints – Describing Intent

You now have Python installed and working. The next step is understanding how to store and work with data in Python. Every program needs to remember things—a person's name, a price, whether something is true or false. **Variables** are how you store that data.

But here's where Python gets interesting: you're not just creating variables, you're **describing intent** through type hints. This lesson introduces the concept that will transform how you think about programming in the AI era.

## Variables – Names for Values

A **variable** is a named container that stores data. Think of it like a labeled box in your closet:

- The label is the variable's **name** (e.g., "winter clothes")
- The contents are the variable's **value** (the actual winter clothes)

In Python, creating a variable looks like this:

```python
age = 25
```

Here, `age` is the variable name, and `25` is the value it holds.

You can use the variable later by referencing its name:

```python
print(age)  # This prints: 25
```

**Variable names should be descriptive**. Instead of `x = 25`, use `age = 25`. Instead of `a = "hello"`, use `name = "hello"`. Your code becomes a conversation with future readers (including your future self).

**Naming convention**: Use lowercase letters with underscores for multi-word names. For example:
- Good: `favorite_color`, `user_age`, `is_student`
- Not ideal: `favoriteColor` (Python convention is lowercase_with_underscores)

## The Four Core Primitive Types

Data comes in different **types**. Python has many types, but four are fundamental. Understanding these will unlock everything else.

### Integer Type – `int`

An **integer** is a whole number (positive, negative, or zero) without decimals.

```python
age: int = 25
year: int = 2025
temperature: int = -5
count: int = 0
```

Use `int` when you're storing whole numbers that make semantic sense (ages, counts, years). Don't use `int` for things that need decimals.

### String Type – `str`

A **string** is text data. Anything enclosed in quotes is a string.

```python
name: str = "Alice"
city: str = "Portland"
message: str = "Hello, Python!"
```

Use `str` for names, addresses, messages, or any text. Notice the quotes around the value—they tell Python "this is text, not a variable name."

### Float Type – `float`

A **float** (floating-point number) is a decimal number.

```python
price: float = 19.99
height: float = 5.7
temperature: float = 98.6
```

Use `float` when you need decimals. Why "float"? It's a historical term from computer science—internally, the decimal point "floats" to different positions depending on the number's size.

### Boolean Type – `bool`

A **boolean** is a truth value—either `True` or `False` (capital letters, no quotes).

```python
is_student: bool = True
has_license: bool = False
is_valid: bool = True
```

Use `bool` for yes/no or on/off states. Booleans are essential for decision-making in programs (which you'll see in later chapters).

## Type Hints – Describing What Data Goes Here

Now comes the critical part: **type hints**.

When you write:

```python
age = 25
```

Python understands that `age` holds the number 25, but the code doesn't explicitly say "age should be an integer."

When you write:

```python
age: int = 25
```

You're adding a **type hint**. The `: int` part says "this variable should hold an integer." You're describing your **intent**.

**Syntax pattern:**
```
variable_name: TypeName = value
```

Examples:
```python
name: str = "Bob"
height: float = 5.9
is_active: bool = True
count: int = 42
```

### Why Type Hints Matter

You might wonder: "Does Python enforce these type hints? Will Python refuse to run if I violate them?"

The answer: **Not at runtime.** Python doesn't enforce type hints when executing code. You could write:

```python
age: int = "twenty-five"  # Type hint says int, but we assigned a string!
```

Python will run this without complaint. But you shouldn't do this. Why? Because:

1. **AI collaboration**: When you work with an AI tool, clear type hints help it generate better, more accurate code. Type hints are your way of saying "I want this variable to hold this type of data."

2. **Human understanding**: Type hints make code self-documenting. When future readers (including you three months from now) see `age: int`, they immediately know what data the variable holds.

3. **Professional development**: In production code, type hints are essential. Tools like **mypy** check types before code runs, catching errors early.

**Key principle**: Type hints are **descriptions of intent**, not enforcement rules. It's your responsibility to respect them.

#### 💬 AI Colearning Prompt

Let's explore type hints with your AI companion:

> "Explain how type hints help an AI (like you) generate better code. Give a specific example: What's the difference between understanding `age = 25` vs. `age: int = 25`? How does the second one give you more information?"

The AI will explain how type hints enable better collaboration. You'll understand that type hints are your primary tool for communicating intent to AI—setting you up for Specification-Driven Development in Part 5.

## Working With Variables

### Reading and Using Variables

Once you've created a variable, you use it by referencing its name:

```python
name: str = "Alice"
age: int = 25

print(name)  # Output: Alice
print(age)   # Output: 25
```

### Checking a Variable's Type

Python provides two functions for checking types:

**`type()` function** – Shows the actual type:

```python
name: str = "Alice"
print(type(name))  # Output: <class 'str'>

age: int = 25
print(type(age))   # Output: <class 'int'>
```

**`isinstance()` function** – Checks if a variable is a specific type:

```python
name: str = "Alice"
print(isinstance(name, str))    # Output: True
print(isinstance(name, int))    # Output: False

age: int = 25
print(isinstance(age, int))     # Output: True
print(isinstance(age, str))     # Output: False
```

`isinstance()` is particularly useful for validation—checking if data is the type you expect.

### Formatting Variables with F-Strings (Preview)

You can insert variables into text using **f-strings** (which you'll learn fully in Lesson 4):

```python
name: str = "Bob"
age: int = 30

print(f"Name: {name}")     # Output: Name: Bob
print(f"Age: {age}")       # Output: Age: 30
print(f"{name} is {age}")  # Output: Bob is 30
```

The `f` prefix tells Python to look for variables inside `{}` and insert their values.

## Collection Types Awareness

Python has types for storing multiple values together: **list**, **dict**, **tuple**, and **set**. These are more complex than primitive types because they hold collections of data.

For now, understand this: **Collections exist, and we'll learn them in detail in Chapters 18-19.**

- **List**: An ordered collection of items (`[1, 2, 3]`)
- **Dict**: A collection of key-value pairs (`{"name": "Alice", "age": 25}`)
- **Tuple**: An ordered, unchangeable collection (`(1, 2, 3)`)
- **Set**: A collection of unique items (`{1, 2, 3}`)

Don't worry about syntax or using them yet. This is just awareness that these types exist. When we reach those chapters, you'll have the foundation to learn them.

#### ✨ Teaching Tip

Type hints are not optional—they're how you describe intent. Every variable gets a type hint. This is professional Python style and absolutely essential for AI collaboration. Make it a habit now.

## Complete Example: All Four Types in Action

Here's a program using all four types:

```python
# Creating typed variables
name: str = "Alice"
age: int = 25
height: float = 5.7
is_student: bool = True

# Displaying them
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Student: {is_student}")

# Checking types
print(f"\nType of name: {type(name)}")
print(f"Type of age: {type(age)}")
print(f"Type of height: {type(height)}")
print(f"Type of is_student: {type(is_student)}")

# Validating types
print(f"\nIs name a string? {isinstance(name, str)}")
print(f"Is age an integer? {isinstance(age, int)}")
```

**Expected output:**
```
Name: Alice
Age: 25
Height: 5.7
Student: True

Type of name: <class 'str'>
Type of age: <class 'int'>
Type of height: <class 'float'>
Type of is_student: <class 'bool'>

Is name a string? True
Is age an integer? True
```

#### 🚀 CoLearning Challenge

Create 5 variables with different types:

1. Your name (str)
2. Your age (int)
3. Your height in meters (float)
4. Whether you're learning AI development (bool)
5. One more piece of data important to you

Write each with a type hint. Then ask your AI:

> "Here are my 5 typed variables: [paste your code] Are the type hints correct? Can you explain why each type matches the data?"

This scaffolded practice lets you write code, then validate it with AI feedback. This is the AI-Native Learning cycle in action.

## Common Mistakes to Avoid

**Mistake 1: Forgetting the colon in type hints**

Wrong: `age int = 25`
Right: `age: int = 25`

The colon (`:`) is required. It separates the variable name from the type hint.

**AI Help**: If you get a syntax error, ask "I wrote `age int = 25` but got an error. What's wrong?"

---

**Mistake 2: Using quotes around numbers**

Wrong: `age: int = "25"`  (This is a string, not an integer!)
Right: `age: int = 25`    (No quotes for numbers)

Quotes tell Python "this is text." Without quotes, Python interprets it as a number.

---

**Mistake 3: Confusing type hints with type enforcement**

Misunderstanding: "Python will refuse to run if I violate type hints."
Reality: Python doesn't enforce type hints at runtime. You could assign a string to an `int` variable, and Python will run without complaint. But you shouldn't—it violates your intent description.

That's why `isinstance()` exists—you check types yourself when it matters.

---

**Mistake 4: Using non-descriptive variable names**

Bad: `x = 25`, `a = "hello"` (What are x and a?)
Good: `age = 25`, `name = "hello"` (Purpose is clear)

Names are for humans, not computers. Make them meaningful.

---

## Try With AI

Use Claude Code or Gemini CLI for this section.

**Prompt 1: Recall – Type Hint Syntax (Bloom's Level 1: Remember)**

```
From Lesson 3, what is the correct syntax for a type hint?

Write the pattern: variable_name: _____ = _____

Give three examples with different types (int, str, float).
```

**Expected Outcome**: You'll recall exact syntax and can replicate the pattern. This demonstrates memorization of the core syntax pattern.

---

**Prompt 2: Understand – Why Type Hints Matter (Bloom's Level 2: Understand)**

```
Explain: "Type hints describe intent."

What does this mean? How does `age: int = 25` describe intent differently
than just `age = 25`?

Ask your AI: "Why is `age: int = 25` better than `age = 25` from an AI
collaboration perspective? What does each version tell you about the
programmer's intent?"
```

**Expected Outcome**: You'll understand type hints as communication tools, not enforcement mechanisms. You'll see the connection to AI collaboration and understand how type hints improve understanding.

---

**Prompt 3: Apply – Creating Typed Variables (Bloom's Level 3: Apply)**

```
Write 5 variables with correct type hints for:

1. A person's name (string)
2. How many years they've been coding (integer)
3. Their coding skill level as a percentage (float, like 0-100)
4. Whether they prefer Python (boolean, True/False)
5. Something else important to you

Check your work: Ask your AI "Are these type hints correct? Can you
explain why each one is right?"
```

**Expected Outcome**: You'll write correct syntax, validate with AI, and demonstrate mastery of basic type hints. You'll feel confident creating typed variables.

---

**Prompt 4: Analyze – Type Validation and Intent (Bloom's Level 4: Analyze)**

```
Here's a puzzle: Python allows this code to run:

\`\`\`python
age: int = "twenty-five"  # Type hint says int, but we assigned a string!
\`\`\`

Ask your AI:
1. Why does Python allow this (wrong data for the type hint)?
2. What's the difference between "type hints" and "type enforcement"?
3. How would you check if age is actually an integer? (Hint: isinstance())
4. Why would violating type hints be a bad idea in professional code?
```

**Expected Outcome**: You'll understand the distinction between hints and enforcement. You'll learn why type consistency matters and how `isinstance()` enables validation. This analytical thinking provides cognitive closure on type hints and prepares you for the next lesson.

