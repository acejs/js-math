type ISortFn = (nums: number[]) => number[]
type ISortFnWithLimit = (
  nums: number[],
  start?: number,
  end?: number
) => number[]

function swap(nums: number[], i: number, j: number) {
  ;[nums[i], nums[j]] = [nums[j], nums[i]]
}

// 冒泡排序
const bubbleSort: ISortFn = nums => {
  for (let j = nums.length - 1; j > 0; j--) {
    for (let i = 1; i <= j; i++) {
      if (nums[i - 1] > nums[i]) swap(nums, i - 1, i)
    }
  }
  return nums
}

const selectionSort: ISortFn = nums => {
  for (let i = nums.length - 1; i > 0; i--) {
    let maxIndex = 0
    for (let j = 1; j <= i; j++) {
      if (nums[j] > nums[maxIndex]) maxIndex = j
    }
    swap(nums, i, maxIndex)
  }
  return nums
}

const insertSort: ISortFn = nums => {
  for (let i = 1; i < nums.length; i++) {
    let cur = i
    while (cur > 0 && nums[cur] < nums[cur - 1]) {
      swap(nums, cur, cur - 1)
      cur--
    }
  }
  return nums
}

const shellSort: ISortFn = nums => {
  const n = nums.length
  let gap = n >> 1
  while (gap > 0) {
    for (let i = 0; i < gap; i++) {
      for (let j = i + gap; j < n; j += gap) {
        let cur = j
        while (cur > i && nums[cur] < nums[cur - gap]) {
          swap(nums, cur, cur - gap)
          cur -= gap
        }
      }
    }
    gap >>= 1
  }
  return nums
}

const mergeSort: ISortFnWithLimit = (
  nums,
  start = 0,
  end = nums.length - 1
) => {
  if (start >= end) return nums
  const mid = (start + end) >> 1

  mergeSort(nums, start, mid)
  mergeSort(nums, mid + 1, end)

  let i = start
  let j = mid + 1
  const cache = new Array(end - start + 1)
  let index = 0
  while (i <= mid && j <= end) {
    if (nums[i] <= nums[j]) cache[index++] = nums[i++]
    else cache[index++] = nums[j++]
  }
  while (i <= mid) cache[index++] = nums[i++]
  while (j <= end) cache[index++] = nums[j++]

  for (let i = 0; i < cache.length; i++) {
    nums[i + start] = cache[i]
  }
  return nums
}

const quickSort: ISortFnWithLimit = (
  nums,
  left = 0,
  right = nums.length - 1
) => {
  if (left >= right) return nums
  let i = left
  let j = right - 1

  while (i <= j) {
    if (nums[i] > nums[right]) swap(nums, i, j--)
    else {
      i++
    }
  }
  j++
  swap(nums, j, right)

  quickSort(nums, left, j - 1)
  quickSort(nums, j + 1, right)
  return nums
}

const heapSort: ISortFn = nums => {
  heapify(nums)
  for (let i = nums.length - 1; i > 0; i--) {
    swap(nums, i, 0)
    rebuild(nums, 0, i - 1)
  }
  function heapify(nums: number[]) {
    for (let i = 1; i < nums.length; i++) {
      let cur = i
      let parent = (cur - 1) >> 1
      while (nums[cur] > nums[parent]) {
        swap(nums, cur, parent)
        cur = parent
        parent = (parent - 1) >> 1
      }
    }
    return nums
  }

  function rebuild(nums: number[], start: number, end: number) {
    const left = start * 2 + 1
    const right = start * 2 + 2
    let max = left

    if (right <= end && nums[right] > nums[max]) max = right

    if (max <= end && nums[max] > nums[start]) {
      swap(nums, max, start)
      rebuild(nums, max, end)
    }
  }

  return nums
}

const countSort: ISortFn = nums => {
  let max = Number.MIN_SAFE_INTEGER
  let min = Number.MAX_SAFE_INTEGER
  for (const num of nums) {
    num > max && (max = num)
    num < min && (min = num)
  }
  const cache = new Array(max - min + 1).fill(0)
  for (const num of nums) {
    cache[num - min]++
  }
  let index = 0
  for (let i = 0; i < cache.length; i++) {
    while (cache[i] > 0) {
      nums[index++] = i + min
      cache[i]--
    }
  }
  return nums
}

const bucketSort: ISortFn = nums => {
  let max = Number.MIN_SAFE_INTEGER
  let min = Number.MAX_SAFE_INTEGER
  for (const num of nums) {
    num > max && (max = num)
    num < min && (min = num)
  }
  const each = 5
  const buckets = Math.ceil((max - min + 1) / each)

  const cache: number[][] = new Array(buckets).fill(0).map(() => [])

  for (const num of nums) {
    cache[Math.floor((num - min) / each)].push(num)
  }

  let index = 0
  for (const ca of cache) {
    if (!ca.length) continue
    ca.sort((prev, next) => prev - next)
    for (const c of ca) {
      nums[index++] = c
    }
  }
  return nums
}
