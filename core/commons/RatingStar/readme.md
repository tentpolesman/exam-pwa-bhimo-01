# Description

RatingStar is module commons to create view start rating

## How To Use

**1. Import module to your component**
```node
import RatingStar from '@common_ratingstar';
```

or

```node
import RatingStar from '{pathModule}/commons/RatingStar';
```

**2. Place RatingStar component on your component**

```node
....
<RatingStar value={10} maxValue={5} />
....
```

### NOTE
Due to limitations on tailwind, you have to change this line of code if you want to change rating star color on partially filled star
```node
<stop offset={`${(value - (ind - 1)) * 100}%`} stopColor="#FBBF24" />
<stop offset={`${(value - (ind - 1)) * 100}%`} stopColor="#E5E7EB" />
```
The first line are the active color, and the second line are the inactive color, other than that, you can just change the tailwind class for text color


### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| `value`       | true    | number value of range | `number` |
| `maxValue`       | false    | max value of range | `number` |
| `sizeIcon`       | false    | number size icon star | `number` |
| `onChange` | optional | function to handle change value | `function` |
| `disabled` | optional | disable component | `boolean` |
| `miniSummary` | optional | show only one star | `boolean` |

