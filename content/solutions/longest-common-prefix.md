---
title: 14. Longest Common Prefix
description: "Vertical scanning variation"
date: "2023-12-02"
index: 14
---

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
