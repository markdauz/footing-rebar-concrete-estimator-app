import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
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
  computeFootingCement,
  computeFootingTotalVolume,
  computeFootingVolume,
} from '../../utils/footingCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';

export default function Footing() {
  const insets = useSafeAreaInsets();

  const [sets, setSets] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');

  const [thickness, setThickness] = useState<string | 'custom' | null>(null);
  const [customThickness, setCustomThickness] = useState('');
  const [openThickness, setOpenThickness] = useState(false);

  const [mix, setMix] = useState<MixType | 'custom' | null>(null);
  const [customMix, setCustomMix] = useState('');
  const [openMix, setOpenMix] = useState(false);

  const thicknessItems = [
    { label: '0.25', value: '0.25' },
    { label: '0.30', value: '0.30' },
    { label: '0.35', value: '0.35' },
    { label: '0.40', value: '0.40' },
    { label: '0.45', value: '0.45' },
    { label: 'Custom', value: 'custom' },
  ];

  const mixItems = [
    { label: 'AA (1:1½:3)', value: 'aa' },
    { label: 'A (1:2:4)', value: 'a' },
    { label: 'B (1:2½:5)', value: 'b' },
    { label: 'C (1:3:6)', value: 'c' },
    { label: 'Custom', value: 'custom' },
  ];

  const effectiveThickness = useMemo(() => {
    if (thickness === 'custom') {
      return customThickness ? parseFloat(customThickness) : NaN;
    }
    return thickness ? parseFloat(thickness) : NaN;
  }, [thickness, customThickness]);

  const volume = useMemo(() => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    if (isNaN(w) || isNaN(l) || isNaN(effectiveThickness)) return 0;
    return computeFootingVolume(w, l, effectiveThickness);
  }, [width, length, effectiveThickness]);

  const totalVolume = useMemo(() => {
    const s = parseFloat(sets);
    if (!volume || isNaN(s)) return 0;
    return computeFootingTotalVolume(volume, s);
  }, [volume, sets]);

  const cement = useMemo(() => {
    if (!totalVolume) return '0.00';

    if (mix === 'custom' && customMix) {
      return (totalVolume * parseFloat(customMix)).toFixed(2);
    }

    if (!mix || mix === 'custom') return '0.00';

    return computeFootingCement(totalVolume, mix);
  }, [totalVolume, mix, customMix]);

  const sand = totalVolume ? (totalVolume * 0.5).toFixed(2) : '0.00';
  const gravel = totalVolume ? totalVolume.toFixed(2) : '0.00';

  const reset = () => {
    setSets('');
    setWidth('');
    setLength('');
    setThickness(null);
    setMix(null);
    setCustomThickness('');
    setCustomMix('');
  };

  return (
    <LinearGradient colors={['#bae6fd', '#7dd3fc']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Footing Calculator',
          headerTransparent: true,
          headerTitleStyle: { color: '#0F172A' },
          headerTintColor: '#0F172A',
        }}
      />

      <SafeAreaView style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 20,
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
          }}
        >
          {/* Icon */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="cube-outline" size={28} color="#0F172A" />
            </View>
          </View>

          {/* Input Card */}
          <View style={styles.card}>
            <Text style={styles.label}>No. of Sets</Text>
            <TextInput
              value={sets}
              onChangeText={setSets}
              keyboardType="numeric"
              style={styles.input}
              placeholder="0"
            />

            <Text style={styles.label}>Width (m)</Text>
            <TextInput
              value={width}
              onChangeText={setWidth}
              keyboardType="numeric"
              style={styles.input}
              placeholder="0.00"
            />

            <Text style={styles.label}>Length (m)</Text>
            <TextInput
              value={length}
              onChangeText={setLength}
              keyboardType="numeric"
              style={styles.input}
              placeholder="0.00"
            />

            <Text style={styles.label}>Thickness</Text>

            {thickness === 'custom' ? (
              <>
                <TextInput
                  value={customThickness}
                  onChangeText={setCustomThickness}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter thickness"
                />
                <TouchableOpacity
                  onPress={() => {
                    setThickness(null);
                    setCustomThickness('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={{ zIndex: 2000 }}>
                <DropDownPicker
                  open={openThickness}
                  value={thickness}
                  items={thicknessItems}
                  setOpen={setOpenThickness}
                  setValue={(callback) => {
                    const val = callback(thickness);
                    if (val === 'custom') setCustomThickness('');
                    setThickness(val);
                  }}
                  placeholder="Select thickness"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  listMode="SCROLLVIEW"
                />
              </View>
            )}

            <Text style={styles.label}>Mixture</Text>

            {mix === 'custom' ? (
              <>
                <TextInput
                  value={customMix}
                  onChangeText={setCustomMix}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter mix"
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
              <View style={{ zIndex: 1000 }}>
                <DropDownPicker
                  open={openMix}
                  value={mix}
                  items={mixItems}
                  setOpen={setOpenMix}
                  setValue={setMix}
                  placeholder="Select mixture"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  listMode="SCROLLVIEW"
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
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
  screen: { flex: 1 },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

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

  label: {
    marginTop: 10,
    marginBottom: 6,
    color: '#64748B',
  },

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
    borderColor: '#E2E8F0',
  },

  backText: {
    color: '#2563EB',
    marginTop: 6,
  },

  reset: {
    marginTop: 16,
    backgroundColor: '#475569',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  resetText: {
    color: '#fff',
    fontWeight: '600',
  },

  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
