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
  getCement,
  getSand,
  getTotalPcs,
  getVolume,
} from '../../utils/mortarCalculator';

type MixType = 'a' | 'b' | 'c' | 'd';

export default function Mortar() {
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
    { label: '0.150', value: '0.150' },
    { label: '0.20', value: '0.20' },
    { label: '0.25', value: '0.25' },
    { label: 'Custom', value: 'custom' },
  ];

  const mixItems = [
    { label: 'A (1:2)', value: 'a' },
    { label: 'B (1:3)', value: 'b' },
    { label: 'C (1:4)', value: 'c' },
    { label: 'D (1:5)', value: 'd' },
    { label: 'Custom', value: 'custom' },
  ];

  const effectiveThickness = useMemo(() => {
    if (thickness === 'custom') {
      return customThickness ? parseFloat(customThickness) : NaN;
    }
    return thickness ? parseFloat(thickness) : NaN;
  }, [thickness, customThickness]);

  const numericArea = parseFloat(area);

  const volume = useMemo(() => {
    if (isNaN(effectiveThickness)) return 0;
    return getVolume(effectiveThickness, 0);
  }, [effectiveThickness]);

  const totalPcs = useMemo(() => {
    if (isNaN(numericArea)) return 0;
    return getTotalPcs(numericArea);
  }, [numericArea]);

  const cement = useMemo(() => {
    if (!numericArea || !volume) return '0.00';

    if (mix === 'custom') {
      if (!customMix) return '0.00';
      return getCement(
        volume,
        numericArea,
        'custom',
        parseFloat(customMix),
      ).toFixed(2);
    }

    if (!mix) return '0.00';

    return getCement(volume, numericArea, mix, 0).toFixed(2);
  }, [volume, numericArea, mix, customMix]);

  const sand = useMemo(() => {
    if (!numericArea) return '0.00';
    return getSand(volume, numericArea).toFixed(2);
  }, [volume, numericArea]);

  const reset = () => {
    setArea('');
    setThickness(null);
    setCustomThickness('');
    setMix(null);
    setCustomMix('');
  };

  return (
    <LinearGradient colors={['#bae6fd', '#7dd3fc']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mortar Calculator',
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
              <Ionicons name="flask-outline" size={28} color="#0F172A" />
            </View>
          </View>

          {/* Input */}
          <View style={styles.card}>
            <Text style={styles.label}>CHB Thickness</Text>

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
                  listMode="SCROLLVIEW"
                />
              </View>
            )}

            <Text style={styles.label}>Area (sqm)</Text>
            <TextInput
              value={area}
              onChangeText={setArea}
              keyboardType="numeric"
              style={styles.input}
              placeholder="0.00"
            />

            <Text style={styles.label}>Mixture</Text>

            {mix === 'custom' ? (
              <>
                <TextInput
                  value={customMix}
                  onChangeText={setCustomMix}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter value"
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

            <Result label="Volume" value={`${volume.toFixed(3)} m³`} />
            <Result label="Area" value={`${area || 0} sqm`} />
            <Result label="Total CHB" value={`${totalPcs}`} />
            <Result label="Cement" value={`${cement} bags`} />
            <Result label="Sand" value={`${sand} m³`} />
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
