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
  computeCHBTotal,
  computeCHBVolBetween,
  computeCHBVolume,
  getEndWeb,
  getInnerWeb,
  getShell,
} from '../../utils/chbCalculator';

export default function CHB() {
  const insets = useSafeAreaInsets();

  const [thicknessMode, setThicknessMode] = useState<
    '0.10' | '0.125' | '0.15' | '0.20' | 'custom' | null
  >(null);

  const [thickness, setThickness] = useState('');
  const [webs, setWebs] = useState<2 | 3 | 4 | null>(null);

  const [openThickness, setOpenThickness] = useState(false);
  const [openWebs, setOpenWebs] = useState(false);

  const thicknessItems = [
    { label: '0.10', value: '0.10' },
    { label: '0.125', value: '0.125' },
    { label: '0.15', value: '0.15' },
    { label: '0.20', value: '0.20' },
    { label: 'Custom', value: 'custom' },
  ];

  const webItems = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];

  // ===== EFFECTIVE VALUES =====
  const effectiveThickness =
    thicknessMode === 'custom'
      ? parseFloat(thickness)
      : thicknessMode
        ? parseFloat(thicknessMode)
        : NaN;

  const numericWebs = webs ?? NaN;

  // ===== COMPUTATIONS =====
  const endWeb = useMemo(
    () => getEndWeb(effectiveThickness),
    [effectiveThickness],
  );

  const innerWeb = useMemo(
    () => getInnerWeb(effectiveThickness, numericWebs),
    [effectiveThickness, numericWebs],
  );

  const shell = useMemo(
    () => getShell(effectiveThickness),
    [effectiveThickness],
  );

  const volume = useMemo(() => {
    if (isNaN(effectiveThickness) || isNaN(numericWebs)) return 0;

    return computeCHBVolume(
      effectiveThickness,
      numericWebs,
      endWeb,
      innerWeb,
      shell,
      thicknessMode === 'custom',
    );
  }, [effectiveThickness, numericWebs, endWeb, innerWeb, shell, thicknessMode]);

  const volBetween = useMemo(
    () => computeCHBVolBetween(effectiveThickness),
    [effectiveThickness],
  );

  const totalVol = useMemo(
    () => computeCHBTotal(volume, volBetween),
    [volume, volBetween],
  );

  const reset = () => {
    setThickness('');
    setThicknessMode(null);
    setWebs(null);
  };

  return (
    <LinearGradient colors={['#bae6fd', '#7dd3fc']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'CHB Calculator',
          headerTransparent: true,
        }}
      />

      <SafeAreaView style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 20,
          }}
        >
          {/* ICON */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="cube" size={28} color="#0F172A" />
            </View>
          </View>

          {/* INPUT CARD */}
          <View style={styles.card}>
            <Text style={styles.label}>CHB Thickness</Text>

            {thicknessMode === 'custom' ? (
              <>
                <TextInput
                  value={thickness}
                  onChangeText={setThickness}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="0.00"
                />
                <TouchableOpacity
                  onPress={() => {
                    setThicknessMode(null);
                    setThickness('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={{ zIndex: 2000 }}>
                <DropDownPicker
                  open={openThickness}
                  value={thicknessMode}
                  items={thicknessItems}
                  setOpen={setOpenThickness}
                  setValue={(cb) => {
                    const val = cb(thicknessMode);
                    if (val === 'custom') {
                      setThickness('');
                    }
                    setThicknessMode(val);
                  }}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <Text style={styles.label}># of Web</Text>
            <View style={{ zIndex: 1000 }}>
              <DropDownPicker
                open={openWebs}
                value={webs}
                items={webItems}
                setOpen={setOpenWebs}
                setValue={setWebs}
                listMode="SCROLLVIEW"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* RESULTS */}
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result label="End Web" value={endWeb || '-'} />
            <Result label="Inner Web" value={innerWeb || '-'} />
            <Result label="Shell" value={shell || '-'} />
            <Result label="Volume" value={volume.toFixed(3)} />
            <Result label="Vol Between" value={volBetween.toFixed(3)} />
            <Result label="Total Vol" value={totalVol.toFixed(3)} />
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
