---
title: 9. Palindrome Number
description: "String conversion solution"
date: "2023-12-01"
index: 9
---

# Palindrome Number

## Problem statement

> Given an integer x, return true if x is a palindrome, and false otherwise.

## Thought process

For this problem I decided to convert the argument `x` to a string because I believed it would be easier to check if it was a plaindrome by utilizing methods like reverse(). I didn't have the mathematical approach on top of my head so this is the approach that I went with. So I started off by making sure that `x` was not negative. Then I created two strings, the first one was storing the string conversion of `x` and the second one was storing the reversed version. I then checked if `y` and `z` were equal and that concluded my solution.

## My solution

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0) return false;
        string y = to_string(x);
        string z = y;
        reverse(z.begin(), z.end());
        if(y == z) return true;
        return false;
    }
};
```
