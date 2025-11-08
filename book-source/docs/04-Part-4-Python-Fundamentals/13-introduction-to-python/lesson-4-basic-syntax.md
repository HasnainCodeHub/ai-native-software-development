---
title: "Basic Syntax and Your First Programs"
chapter: 13
lesson: 4
duration_minutes: 75

# HIDDEN SKILLS METADATA (Institutional Integration Layer)
skills:
  - name: "Python Indentation and Syntax"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student writes code with consistent indentation; avoids mixing tabs and spaces; understands indentation meaning"

  - name: "Using print() and Output Functions"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student uses print() to display variables and text; creates readable output"

  - name: "F-String Formatting"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student uses f-strings to insert variables into text; formats output readably"

  - name: "Creating and Executing Python Files"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student creates .py files in text editor; runs them from terminal; interprets output"

learning_objectives:
  - objective: "Write and run Python programs using proper syntax"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student creates .py files, runs them, and produces expected output"

  - objective: "Use print() and f-strings to create formatted output"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student programs display variables and text in readable format"

cognitive_load:
  new_concepts: 5
  assessment: "5 new concepts (Indentation, Comments, print() function, F-strings, .py files and execution) within A2 limit of 7 ✓"

differentiation:
  extension_for_advanced: "Explore different output formatting options; learn about stderr vs stdout; experiment with print() parameters"
  remedial_for_struggling: "Start with very simple programs (print only); gradually add complexity; use copy-paste for complex syntax before memorizing"

# Generation metadata
generated_by: "lesson-writer v3.0.0"
source_spec: "specs/016-part-4-chapter-13/spec.md"
created: "2025-11-09"
last_modified: "2025-11-09"
git_author: "Claude Code"
workflow: "/sp.implement"
version: "1.0.0"
---

# Basic Syntax and Your First Programs

You've learned what Python is, installed it, created variables, and added type hints. Now it's time to write actual running programs. This lesson teaches you the syntax and structure you need to create code that executes and produces output.

## Indentation – Python's Unique Syntax

Python uses **indentation** (spacing at the beginning of lines) to show code structure. Other languages use curly braces `{}`. Python uses spaces.

```python
# This is a simple Python program
print("Hello")  # No indentation needed here
```

Later, when you learn control flow (if statements, loops), indentation becomes critical:

```python
age: int = 25

if age >= 18:
    print("You're an adult")  # Indented 4 spaces
    print("Vote now!")        # Also indented 4 spaces
```

Notice the `print` statements inside the `if` block are indented. That indentation tells Python "these statements belong to the if block."

**Best practice**: Use **4 spaces per indentation level** (not tabs). Most modern editors (VS Code, Cursor) handle this automatically.

**Common mistake**: Mixing tabs and spaces causes `IndentationError`. Configure your editor to convert tabs to spaces automatically, and you'll avoid this frustration.

For now, at the top level of your programs, don't worry about indentation—we'll use full indentation later when we introduce control flow. Right now, your code will be straightforward without nested indentation.

## Comments – Explaining Code

A **comment** is a line of text that Python ignores. Use `#` to mark a comment:

```python
# This is a comment explaining what this program does
name: str = "Alice"  # This variable stores the user's name
age: int = 25        # Age in years

# Display the information
print(name)
print(age)
```

Comments explain **what** the code does and **why**. Code is for computers; comments are for humans (including future you).

**Good comments explain intent:**
- ✓ `# Convert age from string to integer`
- ✗ `# age = int(age_str)` (This just repeats the code—not helpful)

## The print() Function

The **`print()` function** displays text and data to the screen.

**Basic usage:**

```python
print("Hello, World!")  # Output: Hello, World!
```

**Printing variables:**

```python
name: str = "Alice"
print(name)  # Output: Alice
```

**Printing multiple items:**

```python
name: str = "Alice"
age: int = 25
print(name, age)  # Output: Alice 25
```

**Printing text and variables together:**

```python
name: str = "Alice"
age: int = 25
print("Name:", name)  # Output: Name: Alice
print("Age:", age)    # Output: Age: 25
```

The `print()` function shows output in your terminal. It's how your program communicates with the user.

## F-Strings – Modern Text Formatting

**F-strings** are the modern way to combine text with variables. The name comes from the `f` prefix:

```python
name: str = "Bob"
age: int = 30

# Using f-string
print(f"Name: {name}, Age: {age}")
# Output: Name: Bob, Age: 30
```

Notice the `f` before the quotes. Inside `{}`, you put variable names. Python replaces `{name}` with the variable's value.

**Why f-strings are better:**

Old way:
```python
print("Name: " + name + ", Age: " + str(age))  # Awkward!
```

F-string way:
```python
print(f"Name: {name}, Age: {age}")  # Clear and readable
```

F-strings are modern, readable, and professional. Always use them.

**F-string examples:**

```python
price: float = 19.99
quantity: int = 3
total: float = price * quantity

print(f"Price: ${price}")           # Output: Price: $19.99
print(f"Quantity: {quantity}")      # Output: Quantity: 3
print(f"Total: ${total}")           # Output: Total: $59.97
```

## Creating and Running .py Files

So far, you've run Python commands in the terminal. Real programs are saved in files with a `.py` extension.

**Step 1: Create a file**

Open your text editor (VS Code, Cursor, Sublime, etc.) and create a new file called `hello.py`:

```python
# My first Python program
greeting: str = "Hello, Python!"
print(greeting)
```

Save the file as `hello.py` in a folder you can find easily (like your Desktop or Documents).

**Step 2: Run the file**

Open your terminal and navigate to the folder where you saved `hello.py`. Then run:

```bash
python hello.py
```

(On Mac/Linux, you might use `python3 hello.py`)

You should see:
```
Hello, Python!
```

That's it! You've created and executed your first Python program.

## Code Examples: Running Programs

Here are complete working programs you can save and run:

### Example 1: Hello World with Type Hints

Create a file called `hello.py`:

```python
# My first Python program
greeting: str = "Hello, Python!"
print(greeting)
```

Run it:
```bash
python hello.py
```

**Output:**
```
Hello, Python!
```

---

### Example 2: Displaying Variables

Create a file called `profile.py`:

```python
# Creating typed variables
name: str = "Alice"
age: int = 25
city: str = "Portland"

# Display them
print(name)
print(age)
print(city)
```

Run it:
```bash
python profile.py
```

**Output:**
```
Alice
25
Portland
```

---

### Example 3: F-Strings in Action

Create a file called `formatted.py`:

```python
# Using f-strings for formatted output
name: str = "Bob"
age: int = 30
favorite_language: str = "Python"

# Formatted output
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Favorite Language: {favorite_language}")
print(f"\n{name} loves {favorite_language}!")
```

Run it:
```bash
python formatted.py
```

**Output:**
```
Name: Bob
Age: 30
Favorite Language: Python

Bob loves Python!
```

(The `\n` creates a new line)

#### 🎓 Instructor Commentary

Here's a key insight about Python syntax: **Syntax is cheap—semantics is gold.**

You'll notice Python syntax is straightforward: `print()`, f-strings, basic structure. The Python interpreter is lenient. What matters is understanding WHAT you're building and WHY.

In AI-native development, you don't memorize syntax details. You ask your AI tool. Your job is understanding intent, designing solutions, and validating that code matches your specifications. Syntax is something AI handles brilliantly.

This mindset—understanding over memorization—is what transforms you from a traditional programmer into an AI-Native Developer.

#### ✨ Teaching Tips

- **Indentation errors are frustrating but solvable**: If you see `IndentationError`, check that all lines in the same block have the same spacing. Use a text editor that shows whitespace (VS Code, Cursor) for debugging.

- **Error messages are your friends**: When Python gives you an error, don't panic. Copy the entire error message and ask your AI: "What does this error mean?" This is a professional debugging skill.

- **Test your programs**: Always run your code after writing it. If it doesn't work, the error message tells you what to fix.

#### 🚀 CoLearning Challenge

Write a simple program that prints your name, age, and favorite Python fact using f-strings:

```python
name: str = "Your Name"
age: int = 20
fact: str = "Python is used by NASA"

print(f"I'm {name}, {age} years old")
print(f"Fun fact: {fact}")
```

Save it, run it, then ask your AI:

> "I wrote this program: [paste your code]. Does it look correct? Can you suggest one improvement?"

This practice teaches code review—a professional skill where you submit work to AI for feedback.

## Common Mistakes to Avoid

**Mistake 1: Indentation errors**

Wrong:
```python
print("Hello")
  print("World")  # Extra spaces cause error
```

Right:
```python
print("Hello")
print("World")
```

At the top level, no indentation needed. All lines should start at the same position.

---

**Mistake 2: Forgetting quotes around strings in print()**

Wrong: `print(Hello)` (Python looks for a variable named Hello)
Right: `print("Hello")` (Python prints the text "Hello")

Quotes tell Python "this is text, not a variable name."

---

**Mistake 3: Confusing print() with variable assignment**

Wrong:
```python
print(age) = 25  # Can't assign to print()
```

Right:
```python
age = 25
print(age)  # Create variable first, then print it
```

`print()` displays output. Assignment `=` stores values. Different purposes.

---

**Mistake 4: Using old string formatting**

Old/not recommended:
```python
print("Name: " + name)
print("Name: {}".format(name))
```

Modern/recommended:
```python
print(f"Name: {name}")
```

F-strings are clearer and are professional Python style.

---

## Try With AI

Use Claude Code or Gemini CLI for this section.

**Prompt 1: Recall – Syntax Elements (Bloom's Level 1: Remember)**

```
What are the three syntax elements introduced in Lesson 4?

1. _______ (Python shows code structure with this)
2. _______ (marked with #, explains code)
3. _______ (function that displays output)

Bonus: What's the syntax for an f-string? (f"...{variable}...")
```

**Expected Outcome**: You'll recall syntax elements and demonstrate memorization of key lesson concepts.

---

**Prompt 2: Understand – F-Strings vs. String Concatenation (Bloom's Level 2: Understand)**

```
Explain the difference between these two approaches:

1. "Hello " + name + ", welcome to Python"
2. f"Hello {name}, welcome to Python"

Why does the lesson recommend f-strings? Ask your AI: "What are the
advantages of f-strings over string concatenation? When would you use
each approach?"
```

**Expected Outcome**: You'll understand readability and professional conventions. You'll learn why modern Python prefers f-strings and can explain the advantages.

---

**Prompt 3: Apply – Write Your Own Program (Bloom's Level 3: Apply)**

```
Create a Python program that:

1. Creates 3 variables with type hints (any types/values you choose)
2. Uses print() and f-strings to display them in a sentence
3. Includes at least 2 comments explaining what the code does

Example output might be:
"My name is Alice, I'm 25 years old, and I live in Portland"

Save it as \`my_program.py\`. Run it with \`python my_program.py\`.

Ask your AI: "Here's my program: [paste code] Does this look correct?
Any improvements?"
```

**Expected Outcome**: You'll write working code, demonstrate mastery of variables, type hints, print, and f-strings. You'll practice code review with AI feedback.

---

**Prompt 4: Analyze – Error Interpretation and Debugging (Bloom's Level 4: Analyze)**

```
Here's a broken program—can you fix it?

\`\`\`python
name: str = "Alex"
age int = 30  # ← Something is wrong here!
print(f"Name: {name}, Age: {age}")
\`\`\`

Questions:
1. What's the error in this code? (Hint: look at line 2)
2. Why is it an error? (What rule did it break?)
3. How would you fix it?
4. If Python gave you an error message, what would it say?

Ask your AI: "Here's the error message I got: [paste error]. Can you
explain what went wrong and how to fix it?"
```

**Expected Outcome**: You'll identify missing type hint syntax (colon). You'll understand error messages and practice debugging—the process of finding and fixing problems in code. This demonstrates analytical thinking about code and provides cognitive closure on the lesson's syntax concepts.

