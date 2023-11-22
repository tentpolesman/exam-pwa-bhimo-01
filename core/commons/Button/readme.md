# Description

Button

## How To Use

**1. Import module to your component**
```node
import Button from '@common_button';
```

**2. Use the button component**

```node
<Button variant="primary">
    Text
</Button>
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| children       | true    | component's children, can be a text or component | any |
| className       | false    | additional className for the button | string |
| variant       | false    | defaults to 'primary' | string |
| disabled       | false    | set disabled state, defaults to false | bool |
| loading       | false    | set loading state, defaults to false | bool |
| onClick       | false    | click handler | func |
| size       | false    | size of the button, defaults to 'md' | string |
| iconProps       | false    | set the props of button icon | obj |
| iconProps.icon       | false    | name of the icon, refer to https://fonts.google.com/icons | string |
| iconProps.position       | false    | position of the icon, defaults to 'right' | string |
| iconProps.iconOnly       | false    | show icon only, defaults to false | bool |
