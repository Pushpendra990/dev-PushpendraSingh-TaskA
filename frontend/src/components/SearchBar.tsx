import React, { useState } from "react";
import type { FaqItem } from "../types";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!query.trim()) {
            setError("Please enter a search term.");
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:3000/api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }

            const data = await response.json();
            setResults(data.results || []);
            if (data.results.length === 0) {
                setError(data.message);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h1>FAQ Search</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading results...</p>}
            {error && <p className="error">{error}</p>}

            <div className="results">
                {results.map((item) => (
                    <div key={item.id} className="result-card">
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
