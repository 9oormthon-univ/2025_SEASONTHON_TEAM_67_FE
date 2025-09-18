import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChoiceChips({
                                      options = [],
                                      selected = [],
                                      onToggle = () => {},
                                      accent = '#E1F738',
                                    }) {
  return (
      <View style={s.wrap}>
        {options.map((label) => {
          const active = selected.includes(label);
          return (
              <TouchableOpacity
                  key={label}
                  style={[
                    s.chip,
                    {
                      borderColor: active ? 'transparent' : 'rgba(255,255,255,0.30)',
                      backgroundColor: active ? accent : 'rgba(0,0,0,0.28)',
                    },
                  ]}
                  onPress={() => onToggle(label)}
                  activeOpacity={0.8}
              >
                <Text style={[s.label, { color: active ? '#000' : '#fff' }]}>{label}</Text>
              </TouchableOpacity>
          );
        })}
      </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    width: '86%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',      // ✅ 자연스럽게 2~3줄
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  chip: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 8,
    marginVertical: 8,
    minWidth: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 26,
  },
});
