import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputField({ label, value, onChange }: any) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Enter value"
        placeholderTextColor="#94A3B8"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#334155',
    marginBottom: 6,
    fontSize: 13,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  wrapper: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
});
