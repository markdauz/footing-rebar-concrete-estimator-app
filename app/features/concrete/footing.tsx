import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
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
  computeFootingCement,
  computeFootingTotalVolume,
  computeFootingVolume,
} from '../../../utils/footingCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';
type MixValue = MixType | 'custom';
type ThicknessValue = '0.25' | '0.30' | '0.35' | '0.40' | '0.45' | 'custom';
type Item<T> = { label: string; value: T };

const isAndroid = Platform.OS === 'android';

export default function Footing() {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [sets, setSets] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');

  const [thickness, setThickness] = useState<ThicknessValue | null>(null);
  const [customThickness, setCustomThickness] = useState('');
  const [openThickness, setOpenThickness] = useState(false);

  const [mix, setMix] = useState<MixValue | null>(null);
  const [customMix, setCustomMix] = useState('');
  const [openMix, setOpenMix] = useState(false);

  const thicknessItems: Item<ThicknessValue>[] = [
    { label: '0.25', value: '0.25' },
    { label: '0.30', value: '0.30' },
    { label: '0.35', value: '0.35' },
    { label: '0.40', value: '0.40' },
    { label: '0.45', value: '0.45' },
    { label: 'Custom', value: 'custom' },
  ];

  const mixItems: Item<MixValue>[] = [
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

    if (mix === 'custom') {
      const val = parseFloat(customMix);
      if (isNaN(val)) return '0.00';
      return (totalVolume * val).toFixed(2);
    }

    if (!mix) return '0.00';
    return computeFootingCement(totalVolume, mix);
  }, [totalVolume, mix, customMix]);

  const sand = totalVolume ? (totalVolume * 0.5).toFixed(2) : '0.00';
  const gravel = totalVolume ? totalVolume.toFixed(2) : '0.00';

  useEffect(() => {
    const effectiveThickness =
      thickness === 'custom' ? customThickness : thickness;

    const effectiveMix = mix === 'custom' ? customMix : mix;

    const hasRequiredValues =
      sets && width && length && effectiveThickness && effectiveMix;

    if (!hasRequiredValues) {
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [sets, width, length, thickness, customThickness, mix, customMix]);

  const reset = () => {
    setSets('');
    setWidth('');
    setLength('');
    setThickness(null);
    setCustomThickness('');
    setMix(null);
    setCustomMix('');
    setShowResults(false);
    setIsLoading(false);
  };

  function renderAndroidModal<T>(
    visible: boolean,
    setVisible: (v: boolean) => void,
    items: Item<T>[],
    onSelect: (value: T) => void,
  ) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalOverlay, { paddingTop: insets.top + 80 }]}
          onPress={() => setVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalCard}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.handle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((item) => (
                <TouchableOpacity
                  key={String(item.value)}
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{ headerShown: true, title: '', headerTransparent: true }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="cube-outline" size={26} color="#1e293b" />
            </View>
            <Text style={styles.title}>Footing Calculator</Text>
            <Text style={styles.subtitle}>Cement Sand Gravel Estimate</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>No. of Sets</Text>
            <TextInput
              value={sets}
              onChangeText={setSets}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter value"
            />

            <Text style={styles.label}>Width (m)</Text>
            <TextInput
              value={width}
              onChangeText={setWidth}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter value"
            />

            <Text style={styles.label}>Length (m)</Text>
            <TextInput
              value={length}
              onChangeText={setLength}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter value"
            />

            <Text style={styles.label}>Thickness</Text>

            {thickness === 'custom' ? (
              <>
                <TextInput
                  value={customThickness}
                  onChangeText={setCustomThickness}
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter value"
                />
                <TouchableOpacity onPress={() => setThickness(null)}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenThickness(true)}
                >
                  <Text>
                    {thickness
                      ? thicknessItems.find((i) => i.value === thickness)?.label
                      : 'Select thickness'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openThickness,
                  setOpenThickness,
                  thicknessItems,
                  setThickness,
                )}
              </>
            ) : (
              <View style={{ zIndex: 3000 }}>
                <DropDownPicker
                  open={openThickness}
                  value={thickness}
                  items={thicknessItems}
                  setOpen={setOpenThickness}
                  setValue={setThickness}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <Text style={styles.label}>Mixture</Text>

            {mix === 'custom' ? (
              <>
                <TextInput
                  value={customMix}
                  onChangeText={setCustomMix}
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter value"
                />
                <TouchableOpacity onPress={() => setMix(null)}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenMix(true)}
                >
                  <Text>
                    {mix
                      ? mixItems.find((i) => i.value === mix)?.label
                      : 'Select mixture'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(openMix, setOpenMix, mixItems, setMix)}
              </>
            ) : (
              <View style={{ zIndex: 2000 }}>
                <DropDownPicker
                  open={openMix}
                  value={mix}
                  items={mixItems}
                  setOpen={setOpenMix}
                  setValue={setMix}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loaderText}>Calculating...</Text>
            </View>
          )}

          {showResults && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Results</Text>

              <Result label="Volume" value={`${volume.toFixed(3)} m³`} />
              <Result label="Cement" value={`${cement} bags`} />
              <Result label="Sand" value={`${sand} m³`} />
              <Result label="Gravel" value={`${gravel} m³`} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 24 },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  title: { fontSize: 20, fontWeight: '700', marginTop: 10 },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },

  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600',
    color: '#334155',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },

  dropdown: {
    borderRadius: 12,
    borderColor: '#cbd5e1',
  },

  dropdownContainer: {
    borderColor: '#cbd5e1',
  },

  backText: { color: '#2563EB', marginTop: 6 },

  reset: {
    marginTop: 18,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#475569',
  },

  resetText: { color: '#fff', fontWeight: '600' },

  resultCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#e2e8f0',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  resultLabel: { color: '#94a3b8' },
  resultValue: { fontWeight: '700', color: '#fff', fontSize: 15 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },

  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    maxHeight: 350,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#cbd5e1',
    alignSelf: 'center',
    marginBottom: 10,
  },

  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  modalText: { fontSize: 15 },

  modalCancel: {
    textAlign: 'center',
    marginTop: 12,
    color: '#ef4444',
    fontWeight: '600',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },

  loaderText: {
    marginTop: 10,
    color: '#64748b',
    fontSize: 14,
  },
});
