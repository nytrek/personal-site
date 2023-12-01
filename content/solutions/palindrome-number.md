---
title: 9. Palindrome Number
description: "String conversion solution"
date: "2023-12-01"
---

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
