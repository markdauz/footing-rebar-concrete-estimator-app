import { StyleSheet, Text, View } from 'react-native';
import ResultRow from './ResultRow';

export default function ResultCard({
  title,
  subtitle,
  cutW,
  cutL,
  data,
  tieWire,
  color,
}: any) {
  const headerColor = color === 'blue' ? '#2563EB' : '#16A34A';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Content */}
      <View style={styles.body}>
        <ResultRow label="Cut Size (W)" value={cutW} />
        <ResultRow label="Cut Size (L)" value={cutL} />

        <ResultRow label="Usable (W)" value={data.usableW} />
        <ResultRow label="Usable (L)" value={data.usableL} />

        <ResultRow label="Total (Short)" value={data.totalShort} />
        <ResultRow label="Total (Long)" value={data.totalLong} />

        <View style={styles.highlightBox}>
          <ResultRow label="Total PCS" value={data.totalPCS} bold />
          <ResultRow label="Tie Wire" value={tieWire} bold />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    padding: 14,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
  },
  subtitle: {
    color: '#E0F2FE',
    fontSize: 12,
  },
  body: {
    padding: 14,
  },
  highlightBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
});
