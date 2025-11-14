import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "@docusaurus/router";
import styles from "./BookSearchBar.module.css";

interface SearchResult {
  title: string;
  content: string;
  url: string;
  type: string;
  highlight: string;
}

export default function BookSearchBar(): React.ReactElement {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setIsSearching(true);

    try {
      // Use Docusaurus search functionality if available
      if (typeof window !== "undefined" && (window as any).searchIndex) {
        const searchIndex = (window as any).searchIndex;
        const searchResults = searchIndex.search(searchQuery);

        const formattedResults = searchResults
          .slice(0, 10)
          .map((result: any) => ({
            title: result.document.title || "Untitled",
            content: result.document.content || "",
            url: result.document.url || "#",
            type: getContentType(result.document.url),
            highlight: getHighlight(result.document.content, searchQuery),
          }));

        setResults(formattedResults);
        setShowResults(true);
      } else {
        // Fallback: Simple content filtering
        const mockResults = getMockSearchResults(searchQuery);
        setResults(mockResults);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const getContentType = (url: string): string => {
    if (url.includes("part-")) return "Chapter";
    if (url.includes("exercise")) return "Exercise";
    if (url.includes("spec")) return "Specification";
    return "Content";
  };

  const getHighlight = (content: string, query: string): string => {
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
      return content.substring(0, 150) + "...";
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 100);
    let excerpt = content.substring(start, end);

    if (start > 0) excerpt = "..." + excerpt;
    if (end < content.length) excerpt = excerpt + "...";

    return excerpt;
  };

  const getMockSearchResults = (query: string): SearchResult[] => {
    const lowerQuery = query.toLowerCase();
    const mockData = [
      {
        title: "Introduction to AI Agents",
        content:
          "Learn how AI agents work and how to build them using Python and TypeScript.",
        url: "/docs/part-1/chapter-1",
        type: "Chapter",
      },
      {
        title: "Python Fundamentals",
        content:
          "Master Python basics for AI-native development including variables, functions, and data structures.",
        url: "/docs/part-2/chapter-3",
        type: "Chapter",
      },
      {
        title: "TypeScript Best Practices",
        content:
          "Learn TypeScript development patterns for building robust AI-powered applications.",
        url: "/docs/part-3/chapter-5",
        type: "Chapter",
      },
      {
        title: "Specification-Driven Development",
        content:
          "Write clear specifications that AI can understand and implement effectively.",
        url: "/docs/part-4/chapter-7",
        type: "Specification",
      },
      {
        title: "TDD with AI Co-Pilot",
        content:
          "Test-driven development methodology enhanced with AI assistance for faster iteration.",
        url: "/docs/part-5/chapter-9",
        type: "Chapter",
      },
    ];

    return mockData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.content.toLowerCase().includes(lowerQuery),
      )
      .map((item) => ({
        ...item,
        highlight: getHighlight(item.content, query),
      }));
  };

  const handleResultClick = (url: string) => {
    history.push(url);
    setShowResults(false);
    setQuery("");
  };

  const handleClearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchInputWrapper}>
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search chapters, concepts, code examples..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowResults(true)}
            aria-label="Search the book"
          />

          {query && (
            <button
              className={styles.clearButton}
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          {isSearching && (
            <div className={styles.spinner}>
              <div className={styles.spinnerDot}></div>
            </div>
          )}
        </div>

        <div className={styles.searchHint}>
          💡 Try: "AI Agents", "Python", "TypeScript", "Specifications", "TDD"
        </div>
      </div>

      {showResults && results.length > 0 && (
        <div className={styles.resultsDropdown}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </span>
          </div>

          <div className={styles.resultsList}>
            {results.map((result, index) => (
              <div
                key={index}
                className={styles.resultItem}
                onClick={() => handleResultClick(result.url)}
              >
                <div className={styles.resultHeader}>
                  <span className={styles.resultType}>{result.type}</span>
                  <h4 className={styles.resultTitle}>{result.title}</h4>
                </div>
                <p className={styles.resultContent}>{result.highlight}</p>
                <span className={styles.resultUrl}>{result.url}</span>
              </div>
            ))}
          </div>

          <div className={styles.resultsFooter}>
            <span className={styles.footerText}>
              Press <kbd>ESC</kbd> to close • Click result to navigate
            </span>
          </div>
        </div>
      )}

      {showResults && query && results.length === 0 && !isSearching && (
        <div className={styles.resultsDropdown}>
          <div className={styles.noResults}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="11" y1="16" x2="11.01" y2="16" />
            </svg>
            <h4>No results found</h4>
            <p>Try different keywords or check the spelling</p>
          </div>
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={styles.keyboardHint}>
        <kbd>Ctrl</kbd> + <kbd>K</kbd> to focus search
      </div>
    </div>
  );
}
