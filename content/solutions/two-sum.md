---
title: 1. Two Sum
description: "Brute force solution"
date: "2023-11-30"
index: 1
---

# Two Sum

## Problem statement

> Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
> You may assume that each input would have exactly one solution, and you may not use the same element twice.
> You can return the answer in any order.

## Thought process

At first sight I decided to go with the brute force approach where I would iterate over two numbers in the list concurrently and check if they added up to the target. This would result in a complexity of O(n)^2 with regards to the 2 for loops. This was the approach that made sense at the time however after going through the editorial section I would have gone with one of the hash table approaches where you would store the list of numbers in a hashmap and check inside a for loop iteration if there was a mapping in the hashmap that matched `int complement = target - nums[i];`

## My solution

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        for(int i = 0; i < nums.size(); i++){
            for(int j = i + 1; j < nums.size(); j++){
                if(nums[i] + nums[j] == target) return std::vector<int>{i, j};
            };
        };
        return std::vector<int>{0, 0};
    };
};
```
