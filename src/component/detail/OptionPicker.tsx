import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { appColors } from '../../constants/appColors';
import { appIcon } from '../../constants/appIcon';
import { appFontSize } from '../../constants/appFontSizes';

interface OptionPickerProps {
  option: number;
  onOptionChange: (option: number) => void;
  options: number[];
  optionTitle?: string; // Make optionTitle optional
  handleSave?: Function;
  mode?: 'dialog' | 'dropdown';
  titleHandleSave?: string;
  icon?: any; // Make icon optional
}

const OptionPicker: React.FC<OptionPickerProps> = ({ option, onOptionChange, options, optionTitle, handleSave, mode = "dialog", titleHandleSave="Lưu", icon }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center'}}>
      {optionTitle && (
        <Text style={{ flex: 1, fontSize: appFontSize.normal, fontWeight: 'bold', color: appColors.warmOrange }}>
          {optionTitle}</Text>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center', height: 40, borderWidth: 1, 
      borderRadius: 8, paddingLeft: 15, borderColor: appColors.boderColor, marginLeft: 5}}>
        {icon && <FontAwesomeIcon icon={icon} color={appColors.yellow} size={appIcon.normal} />}
        <Picker
          selectedValue={option}
          style={{minHeight: 50, maxHeight: 50, minWidth: 100, maxWidth: 200}}
          onValueChange={(itemValue : any) => onOptionChange(itemValue)}
          mode={mode}
          >
          {options.map((value, index) => (
            <Picker.Item key={index} label={value.toString()} value={value} style={{fontSize: 14}} />
          ))}
        </Picker>
      </View>
      {handleSave && ( // Render save button if handleSaveReview is provided
        <TouchableOpacity onPress={()=>handleSave()} style={{backgroundColor: appColors.primary, paddingVertical: 10, marginLeft: 10,
        paddingHorizontal: 15, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: appColors.white, fontWeight: 'bold', fontSize: appFontSize.normal }}>{titleHandleSave}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OptionPicker;
