"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import ComplaintCard from "@/components/ComplaintCard";
import { Input } from "@/registry/new-york/ui/input";

const ComplaintFeed = () => {
  const { user, userId } = useAuth();
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Fetch complaints from the server
  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaint");
      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }
      const data = await response.json();
      console.log("Fetched complaints:", data); // Log fetched data
      setAllComplaints(data);
      filterUserComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Filter complaints to show only those belonging to the logged-in user
  const filterUserComplaints = (complaints) => {
    if (userId) {
      const userComplaints = complaints.filter(
        (complaint) => complaint.userId === userId
      );
      console.log("Filtered complaints:", userComplaints); // Log filtered data
      setFilteredComplaints(userComplaints);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const value = e.target.value;
    setSearchText(value);

    // Debounce search input
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterComplaints(value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // Filter complaints based on search text
  const filterComplaints = (searchText) => {
    const regex = new RegExp(searchText, "i");
    const results = filteredComplaints.filter(
      (item) =>
        regex.test(item.name) ||
        regex.test(item.status)
    );
    return results;
  };

  // Handle tag click to set search text
  const handleTagClick = (name) => {
    setSearchText(name);
    const searchResult = filterComplaints(name);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    fetchComplaints();
  }, [userId]); // Refetch complaints when userId changes

  return (
    <section className="w-full px-6 py-4">
      <div className="space-between items-center md:flex ">
        <div className="text-center">
          <h1 className="mb-6 text-xl font-semibold">My Complaints</h1>
        </div>
        <div className="ml-auto flex min-w-20 justify-center">
          <form className="mb-6">
            <Input
              type="text"
              placeholder="Search for a complaint..."
              value={searchText}
              onChange={handleSearchChange}
              className="rounded border-gray-300 p-2 shadow-md"
            />
          </form>
        </div>
      </div>

      {/* All Complaints */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {searchText ? (
          searchedResults.length > 0 ? (
            searchedResults.map(complaint => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                handleTagClick={handleTagClick}
              />
            ))
          ) : (
            <p>No results found</p>
          )
        ) : (
          filteredComplaints.length > 0 ? (
            filteredComplaints.map(complaint => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                handleTagClick={handleTagClick}
              />
            ))
          ) : (
            <p>No complaints available</p>
          )
        )}
      </div>
    </section>
  );
};

export default ComplaintFeed;
