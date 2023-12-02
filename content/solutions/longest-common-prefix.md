---
title: 14. Longest Common Prefix
description: "Vertical scanning variation"
date: "2023-12-02"
index: 14
---

# Longest Common Prefix

## Problem statement

> Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".

## Thought process

This was a bit tough for me at first. I had to try out different approaches before I ended up with my solution. My plan was to get the shortest string in the list along with its length. Because the longest prefix can only be as long as the shortest string in the list. Then I would use that as reference to check the remaining strings. So I used a for loop to extract the shortest string then I created a nested for loop where I would iterate over the length of the shortest string and I would concatinate the characters that were equal to the shortest string at a given index. I would continue with this approach until there were no more characters to check or if there were characters that did not match, then I would simply return the concatinated string at its current state.

## My solution

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        int min = 0;
        string s = "";
        string output = "";
        for(int i = 0; i < strs.size(); i++){
            if(min == 0){
                s = strs[i];
                min = strs[i].length();
            }
            else if(strs[i].length() < min){
                s = strs[i];
                min = strs[i].length();
            }
        }
        for(int i = 0; i < min; i++){
            bool flag = true;
            for(int j = 0; j < strs.size(); j++){
                std::cout << s << " " << strs[j] << std::endl;
                if(s == strs[j]) continue;
                else if(s[i] != strs[j][i]){
                    flag = false;
                    break;
                }
            }
            std::cout << flag << std::endl;
            if(flag) output += s[i];
            else return output;
        }
        return output;
    }
};
```
