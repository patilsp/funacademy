"use client";

import { useState, useEffect, useRef } from "react";
import PromptCard from "./PromptCard";
import { motion } from "framer-motion";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='prompt_layout'>
      {data.map((post) => (
        <motion.div
          key={post._id}
          className="p-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut" }}
        >
          <PromptCard
            post={post}
            handleTagClick={handleTagClick}
          />
        </motion.div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Ref for tracking scroll position
  const scrollRef = useRef(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log("Fetched data:", data); // Log fetched data to check for duplicates

      // Add only new posts that are not already in allPosts
      setAllPosts((prevPosts) => [
        ...prevPosts.filter((post) => !data.some((newPost) => newPost._id === post._id)),
        ...data
      ]);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
    setIsLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed mb-20 p-4' ref={scrollRef}>        
        <form className='flex w-full items-center justify-between gap-2'>
        <h1 className="text-bold text-xl"> Feeds </h1>
          <input
            type='text'
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </form>
      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}

      {isLoading && <p>Loading...</p>}
    </section>
  );
};

export default Feed;
