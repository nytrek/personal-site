---
title: 20. Valid Parenthesis
description: "Stacks solution"
date: "2023-12-02"
index: 14
---

# Valid Parenthesis

## Problem statement

> Given a string s containing just the characters (, ), {, }, \[ and \], determine if the input string is valid.
>
> An input string is valid if:
>
> 1. Open brackets must be closed by the same type of brackets.
> 2. Open brackets must be closed in the correct order.
> 3. Every close bracket has a corresponding open bracket of the same type.

## Attempt 1

When faced with this problem, my intuition was to keep track of the opening brackets. I created two maps, the first one was to store the mappings between an open and a closed bracket and the second one was for storing the indices of the open brackets. I then proceeded to create two for loops, one was for extracting the position of the opening brackets and the second one was to see if the correct closing bracket was at the expected position.

```cpp
class Solution {
public:
    bool isValid(string s) {
        if(s.length() <= 1) return false;
        std::map<char, char> dict = {
            { '(', ')' },
            { '[', ']' },
            { '{', '}' }
        };
        std::map<int, char> open;
        for(int i = 0; i < s.length(); i++){
            if(
                (dict.find(s.at(i)) != dict.end() &&
                i != s.length() - 1 &&
                dict.find(s.at(i))->second != s.at(i + 1)) || dict.find(s.at(s.length() - 1)) != dict.end()
            )
            open[i] = s.at(i);
        }
        for(int j = 0; j < open.size(); j++){
            if(dict.find(open.find(j)->second)->second != s[s.length() - 1 - j]) return false;
        }
        return true;
    }
};
```

This approach gave rise to many edge cases and ultimately I wasn't able to complete this problem using this method

## Attempt 2

After going through the editorial section. I realized what I did wrong in my previous attempt. The first thing was that I was using a map to keep track of the brackets. It would have made things a whole lot easier, had I choosen the right data structure which is a stack. A stack has the order of LIFO (Last In First Out) which is how we want to keep track of the brackets. We want to find the most recently added bracket and match it to its coorespondence in order to verify if it is a valid string. Another thing is the way I kept the mapping of the brackets. I used the opening bracket as key value but it would be much better to use the closing bracket. For example, given the string - "()". If I had used the opening bracket as key value, the closing bracket would have been added to the stack at the end of the iteration and I wouldn't be able to verify the authenticity of the string whereas if I had used a closing bracket as key value, I would be able to check if there was a corresponding bracket before the iteration ended. By utilizing a stack I was able to complete the problem with a more refined solution.

```cpp
class Solution {
public:
    bool isValid(string s) {
        std::map<char, char> dict = {
            { ')', '(' },
            { ']', '[' },
            { '}', '{' }
        };
        stack<char> open;
        for(int i = 0; i < s.length(); i++){
            char topElement = open.empty() ? '#' : open.top();
            if(dict.find(s.at(i)) == dict.end()) open.push(s.at(i));
            else if(topElement != dict.find(s.at(i))->second) return false;
            else open.pop();
        }
        return open.empty();
    }
};
```
