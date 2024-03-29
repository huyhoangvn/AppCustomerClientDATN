import {CheckBox } from "@rneui/base";
import React from "react";

export default () => {
  const [checked, setChecked] = React.useState(true);
  return (
    <CheckBox
      checked={checked}
      checkedColor="#FFB800"
      containerStyle={{ width: "75%" }}
      onIconPress={() => setChecked(!checked)}
      onLongIconPress={() =>
        console.log("onLongIconPress()")
      }
      onLongPress={() => console.log("onLongPress()")}
      onPress={() => console.log("onPress()")}
      size={30}
      textStyle={{}}
      title="Nhớ tài khoản"
      titleProps={{}}
      uncheckedColor="#FFB800"
    />
  );
}