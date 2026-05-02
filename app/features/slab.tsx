import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
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

import { computeCement, computeVolume } from '../../utils/slabCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';

export default function Slab() {
  const insets = useSafeAreaInsets();
  const [area, setArea] = useState('');

  const [thickness, setThickness] = useState<string | 'custom' | null>(null);
  const [customThickness, setCustomThickness] = useState('');
  const [openThickness, setOpenThickness] = useState(false);

  const [mix, setMix] = useState<MixType | 'custom' | null>(null);
  const [customMix, setCustomMix] = useState('');
  const [openMix, setOpenMix] = useState(false);

  const thicknessItems = [
    { label: '0.10', value: '0.10' },
    { label: '0.125', value: '0.125' },
    { label: '0.15', value: '0.15' },
    { label: '0.20', value: '0.20' },
    { label: 'Custom', value: 'custom' },
  ];

  const mixItems = [
    { label: 'AA (1:1½:3)', value: 'aa' },
    { label: 'A (1:2:4)', value: 'a' },
    { label: 'B (1:2½:5)', value: 'b' },
    { label: 'C (1:3:6)', value: 'c' },
    { label: 'Custom', value: 'custom' },
  ];

  const effectiveThickness =
    thickness === 'custom'
      ? parseFloat(customThickness)
      : thickness
        ? parseFloat(thickness)
        : NaN;

  const volume = useMemo(() => {
    const a = parseFloat(area);
    if (isNaN(a) || isNaN(effectiveThickness)) return 0;
    return computeVolume(a, effectiveThickness);
  }, [area, effectiveThickness]);

  const cement = useMemo(() => {
    if (!volume) return '0.00';

    if (mix === 'custom' && customMix) {
      return (volume * parseFloat(customMix)).toFixed(2);
    }

    if (!mix) return '0.00';

    return computeCement(volume, mix as MixType);
  }, [volume, mix, customMix]);

  const sand = volume ? (volume * 0.5).toFixed(2) : '0.00';
  const gravel = volume ? volume.toFixed(2) : '0.00';

  const reset = () => {
    setArea('');
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
          title: 'Slab Calculator',
          headerTransparent: true,
          headerTitleStyle: { color: '#0F172A' },
          headerTintColor: '#0F172A',
        }}
      />
      <SafeAreaView style={styles.screen}>
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
          <View style={[styles.header]}>
            <View style={styles.iconBox}>
              <Ionicons name="grid-outline" size={28} color="#0F172A" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Area (sqm)</Text>
            <TextInput
              value={area}
              onChangeText={setArea}
              keyboardType="numeric"
              style={styles.input}
              placeholder="0.00"
            />

            <Text style={styles.label}>Thickness (m)</Text>

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
                  setValue={setThickness}
                  placeholder="Select thickness"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            {/* MIX */}
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
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result label="Volume" value={`${volume.toFixed(3)} m³`} />
            <Result label="Cement" value={`${cement} bags`} />
            <Result label="Sand" value={`${sand} m³`} />
            <Result label="Gravel" value={`${gravel} m³`} />
          </View>
        </View>
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
  container: {
    padding: 16,
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  label: { color: '#64748B', marginBottom: 6, marginTop: 10 },
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
    fontSize: 13,
  },
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
    color: '#0F172A',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  resultLabel: { color: '#64748B' },
  resultValue: { fontWeight: '600', color: '#0F172A' },
});
