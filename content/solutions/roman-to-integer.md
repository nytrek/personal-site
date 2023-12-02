---
title: 13. Roman to Integer
description: "2 map solution"
date: "2023-12-02"
---

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
