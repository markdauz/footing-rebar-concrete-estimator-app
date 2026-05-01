import { StyleSheet, Text, View } from 'react-native';

export default function ResultRow({ label, value, bold = false }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    color: '#64748B',
  },
  value: {
    color: '#0F172A',
  },
  bold: {
    fontWeight: '700',
    color: '#020617',
  },
});
