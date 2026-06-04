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

import { computeCement, computeVolume } from '../../../utils/slabCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';

const isAndroid = Platform.OS === 'android';

export default function Slab() {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

  useEffect(() => {
    const effectiveThickness =
      thickness === 'custom' ? customThickness : thickness;

    const effectiveMix = mix === 'custom' ? customMix : mix;

    const hasRequiredValues = area && effectiveThickness && effectiveMix;

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
  }, [area, thickness, customThickness, mix, customMix]);

  const reset = () => {
    setArea('');
    setThickness(null);
    setMix(null);
    setCustomThickness('');
    setCustomMix('');

    setShowResults(false);
    setIsLoading(false);
  };

  const renderAndroidModal = (
    visible: boolean,
    setVisible: (v: boolean) => void,
    items: any[],
    onSelect: (value: any) => void,
  ) => (
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

          <ScrollView>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
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
              <Ionicons name="grid-outline" size={26} color="#1e293b" />
            </View>
            <Text style={styles.title}>Slab Calculator</Text>
            <Text style={styles.subtitle}>Cement Sand Gravel Estimate</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Area (sqm)</Text>
            <TextInput
              value={area}
              onChangeText={setArea}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter value"
            />

            <Text style={styles.label}>Thickness (m)</Text>

            {thickness === 'custom' ? (
              <>
                <TextInput
                  value={customThickness}
                  onChangeText={setCustomThickness}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter value"
                />
                <TouchableOpacity onPress={() => setThickness(null)}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => {
                    setOpenMix(false);
                    setOpenThickness(true);
                  }}
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
              <View style={{ zIndex: 1000 }}>
                <DropDownPicker
                  open={openThickness}
                  value={thickness}
                  items={thicknessItems}
                  setOpen={(value) => {
                    const next =
                      typeof value === 'function'
                        ? value(openThickness)
                        : value;

                    if (next) {
                      setOpenMix(false);
                    }

                    setOpenThickness(next);
                  }}
                  setValue={setThickness}
                  placeholder="Select thickness"
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
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter value"
                />
                <TouchableOpacity onPress={() => setMix(null)}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => {
                    setOpenThickness(false);
                    setOpenMix(true);
                  }}
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
              <View style={{ zIndex: 900 }}>
                <DropDownPicker
                  open={openMix}
                  value={mix}
                  items={mixItems}
                  setOpen={(value) => {
                    const next =
                      typeof value === 'function' ? value(openMix) : value;

                    if (next) {
                      setOpenThickness(false);
                    }

                    setOpenMix(next);
                  }}
                  setValue={setMix}
                  placeholder="Select mixture"
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

function Result({ label, value, highlight }: any) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={[styles.resultValue, highlight && { fontSize: 18 }]}>
        {value}
      </Text>
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

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },

  label: {
    color: '#334155',
    marginBottom: 6,
    marginTop: 14,
    fontSize: 13,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },

  androidInput: {
    justifyContent: 'center',
  },

  dropdown: {
    borderRadius: 12,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    minHeight: 50,
  },

  dropdownContainer: {
    borderColor: '#cbd5e1',
    borderRadius: 12,
  },

  backText: {
    color: '#2563EB',
    marginTop: 6,
    fontSize: 13,
  },

  reset: {
    marginTop: 18,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#475569',
  },

  resetText: {
    color: '#fff',
    fontWeight: '600',
  },

  resultCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    elevation: 3,
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

  resultLabel: {
    color: '#94a3b8',
  },

  resultValue: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 15,
  },

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

  modalText: {
    fontSize: 15,
    color: '#0f172a',
  },

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
