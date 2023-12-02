---
title: 13. Roman to Integer
description: "2 map solution"
date: "2023-12-02"
index: 13
---

# Roman to Integer

## Problem statement

> Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
> Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is
> written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX.
> There are six instances where subtraction is used:
>
> - I can be placed before V (5) and X (10) to make 4 and 9.
> - X can be placed before L (50) and C (100) to make 40 and 90.
> - C can be placed before D (500) and M (1000) to make 400 and 900.
>
> Given a roman numeral, convert it to an integer.

## Thought process

For this solution I wanted to create two separate maps to store the roman numerlas and the 6 subtraction exceptions. This might not be the most effecient approach but I wanted to try something different. I wasn't thinking about going for the most effecient solution at the time. Once I had both maps setup, it was time to perform the addition of the numeric values. Initially I had used a for loop but I realized later on that I wasn't going to be able to use a for loop because I wouldn't be able to control the iteration value. Since there were two cases I had to keep track of.

1. If the substring of 2 values of the initial string was mapped to a value in the subtraction map. I would use the mapped value and skipped 2 iterations
2. Else I would add the first value of the substring and skipped 1 iteration

## My solution

```cpp
class Solution {
public:
    int romanToInt(string s) {
        std::map<char, int> roman = {
            { 'I', 1 },
            { 'V', 5 },
            { 'X', 10 },
            { 'L', 50 },
            { 'C', 100 },
            { 'D', 500 },
            { 'M', 1000 },
        };
        std::map<string, int> subtraction = {
            { "IV", 4 },
            { "IX", 9 },
            { "XL", 40 },
            { "XC", 90 },
            { "CD", 400 },
            { "CM", 900 }
        };
        int i = 0;
        int sum = 0;
        while(i < s.length()){
            if(subtraction.find(s.substr(i, 2)) != subtraction.end()){
                sum += subtraction.find(s.substr(i, 2))->second;
                i += 2;
            }
            else{
                sum += roman.find(s.at(i))->second;
                i++;
            };
        }
        return sum;
    };
};
```
