import React, { useState } from "react";
import { Box, Input, InputGroup, InputLeftElement, Stack, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaSearchLocation, FaTimes } from "react-icons/fa";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const toast = useToast();

  // Mock function to simulate fetching street suggestions
  // In a real-world scenario, you would replace this with an actual API call.
  const fetchStreetSuggestions = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    // Simulate an API call with a static array of suggestions
    // You would replace this with your actual API call logic.
    const mockSuggestions = [
      "Main Street",
      "Maple Avenue",
      "Oak Street",
      "Pine Lane",
      // ... more suggestions
    ].filter((street) => street.toLowerCase().includes(searchTerm.toLowerCase()));

    setSuggestions(mockSuggestions);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchStreetSuggestions(value);
  };

  const handleClearInput = () => {
    setInputValue("");
    setSuggestions([]);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <Box p={8}>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaSearchLocation color="gray.300" />} />
          <Input placeholder="Search for a street" value={inputValue} onChange={handleInputChange} onFocus={() => fetchStreetSuggestions(inputValue)} />
          {inputValue && (
            <InputLeftElement top="0" right="0" m="auto" h="100%">
              <IconButton icon={<FaTimes />} size="sm" aria-label="Clear input" onClick={handleClearInput} />
            </InputLeftElement>
          )}
        </InputGroup>
        {suggestions.length > 0 && (
          <List boxShadow="md" borderRadius="md" maxH="200px" overflowY="auto" bg="white">
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} p={2} _hover={{ bg: "gray.100", cursor: "pointer" }} onClick={() => handleSelectSuggestion(suggestion)}>
                {suggestion}
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </Box>
  );
};

export default Index;
