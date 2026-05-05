import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  computeColumnCement,
  computeColumnGravel,
  computeColumnSand,
  computeColumnTotalVolume,
  computeColumnVolume,
} from '../../utils/columnCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';

export default function Column() {
  const insets = useSafeAreaInsets();

  const [sets, setSets] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [height, setHeight] = useState('');

  const [mix, setMix] = useState<MixType | 'custom' | null>(null);
  const [customMix, setCustomMix] = useState('');
  const [openMix, setOpenMix] = useState(false);

  const mixItems = [
    { label: 'AA (1:1½:3)', value: 'aa' },
    { label: 'A (1:2:4)', value: 'a' },
    { label: 'B (1:2½:5)', value: 'b' },
    { label: 'C (1:3:6)', value: 'c' },
    { label: 'Custom', value: 'custom' },
  ];

  const volume = useMemo(() => {
    const w = parseFloat(width);
    const d = parseFloat(depth);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(d) || isNaN(h)) return 0;
    return computeColumnVolume(w, d, h);
  }, [width, depth, height]);

  const totalVolume = useMemo(() => {
    const s = parseFloat(sets);
    if (!volume || isNaN(s)) return 0;
    return computeColumnTotalVolume(volume, s);
  }, [volume, sets]);

  const cement = useMemo(() => {
    if (!totalVolume) return '0.00';

    if (mix === 'custom' && customMix) {
      return (totalVolume * parseFloat(customMix)).toFixed(2);
    }

    if (!mix || mix === 'custom') return '0.00';

    return computeColumnCement(totalVolume, mix);
  }, [totalVolume, mix, customMix]);

  const sand = useMemo(() => {
    if (!totalVolume || !mix || mix === 'custom') return '0.00';
    return computeColumnSand(totalVolume, mix);
  }, [totalVolume, mix]);

  const gravel = useMemo(() => {
    if (!totalVolume || !mix || mix === 'custom') return '0.00';
    return computeColumnGravel(totalVolume, mix);
  }, [totalVolume, mix]);

  const reset = () => {
    setSets('');
    setWidth('');
    setDepth('');
    setHeight('');
    setMix(null);
    setCustomMix('');
  };

  return (
    <LinearGradient colors={['#bae6fd', '#7dd3fc']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Column Calculator',
          headerTransparent: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="apps-outline" size={28} color="#0F172A" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>No. of Sets</Text>
            <TextInput
              value={sets}
              onChangeText={setSets}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Width (m)</Text>
            <TextInput
              value={width}
              onChangeText={setWidth}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Depth (m)</Text>
            <TextInput
              value={depth}
              onChangeText={setDepth}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Height (m)</Text>
            <TextInput
              value={height}
              onChangeText={setHeight}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Mixture</Text>

            {mix === 'custom' ? (
              <>
                <TextInput
                  value={customMix}
                  onChangeText={setCustomMix}
                  style={styles.input}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => {
                    setMix(null);
                    setCustomMix('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={{
                  zIndex: openMix ? 3000 : 1,
                  ...(Platform.OS === 'android' && {
                    elevation: openMix ? 3000 : 0,
                  }),
                }}
              >
                <DropDownPicker
                  open={openMix}
                  value={mix}
                  items={mixItems}
                  setOpen={(val) => {
                    setOpenMix((prev) => {
                      const next = typeof val === 'function' ? val(prev) : val;
                      return next;
                    });
                  }}
                  setValue={setMix}
                  listMode={Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW'}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result label="Volume (1 pc)" value={`${volume.toFixed(3)} m³`} />
            <Result
              label="Total Volume"
              value={`${totalVolume.toFixed(3)} m³`}
            />
            <Result label="Cement" value={`${cement} bags`} />
            <Result label="Sand" value={`${sand} m³`} />
            <Result label="Gravel" value={`${gravel} m³`} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Result({ label, value }: any) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 32 },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  label: { marginTop: 10, marginBottom: 6, color: '#64748B' },

  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  dropdown: {
    borderRadius: 10,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },

  dropdownContainer: {
    borderColor: '#E2E8F0', // no elevation
  },

  backText: { color: '#2563EB', marginTop: 6 },

  reset: {
    marginTop: 16,
    backgroundColor: '#475569',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  resetText: { color: '#fff', fontWeight: '600' },

  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  resultTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  resultLabel: { color: '#64748B' },
  resultValue: { fontWeight: '600' },
});
