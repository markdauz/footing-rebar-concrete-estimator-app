import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
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
  computeWallFootingCement,
  computeWallFootingGravel,
  computeWallFootingSand,
  computeWallFootingVolume,
} from '../../utils/wallFootingCalculator';

type MixType = 'aa' | 'a' | 'b' | 'c';
type MixValue = MixType | 'custom';

type WidthValue = '0.30' | '0.35' | '0.40' | '0.50' | '0.60' | 'custom';
type ThicknessValue = '0.10' | '0.15' | '0.20' | '0.25' | '0.30' | 'custom';

type Item<T> = { label: string; value: T };

const isAndroid = Platform.OS === 'android';

export default function WallFooting() {
  const insets = useSafeAreaInsets();

  const [sets, setSets] = useState('');
  const [length, setLength] = useState('');

  const [width, setWidth] = useState<WidthValue | null>(null);
  const [customWidth, setCustomWidth] = useState('');
  const [openWidth, setOpenWidth] = useState(false);

  const [thickness, setThickness] = useState<ThicknessValue | null>(null);
  const [customThickness, setCustomThickness] = useState('');
  const [openThickness, setOpenThickness] = useState(false);

  const [mix, setMix] = useState<MixValue | null>(null);
  const [customMix, setCustomMix] = useState('');
  const [openMix, setOpenMix] = useState(false);

  const widthItems: Item<WidthValue>[] = [
    { label: '0.30', value: '0.30' },
    { label: '0.35', value: '0.35' },
    { label: '0.40', value: '0.40' },
    { label: '0.50', value: '0.50' },
    { label: '0.60', value: '0.60' },
    { label: 'Custom', value: 'custom' },
  ];

  const thicknessItems: Item<ThicknessValue>[] = [
    { label: '0.10', value: '0.10' },
    { label: '0.15', value: '0.15' },
    { label: '0.20', value: '0.20' },
    { label: '0.25', value: '0.25' },
    { label: '0.30', value: '0.30' },
    { label: 'Custom', value: 'custom' },
  ];

  const mixItems: Item<MixValue>[] = [
    { label: 'AA (1:1½:3)', value: 'aa' },
    { label: 'A (1:2:4)', value: 'a' },
    { label: 'B (1:2½:5)', value: 'b' },
    { label: 'C (1:3:6)', value: 'c' },
    { label: 'Custom', value: 'custom' },
  ];

  const effectiveWidth =
    width === 'custom'
      ? parseFloat(customWidth)
      : width
        ? parseFloat(width)
        : NaN;

  const effectiveThickness =
    thickness === 'custom'
      ? parseFloat(customThickness)
      : thickness
        ? parseFloat(thickness)
        : NaN;

  const numericLength = parseFloat(length);
  const numericSets = parseFloat(sets);

  const volume = useMemo(() => {
    if (
      isNaN(effectiveWidth) ||
      isNaN(effectiveThickness) ||
      isNaN(numericLength)
    )
      return 0;

    return computeWallFootingVolume(
      effectiveWidth,
      numericLength,
      effectiveThickness,
    );
  }, [effectiveWidth, effectiveThickness, numericLength]);

  const totalVolume = useMemo(() => {
    if (!volume || isNaN(numericSets)) return 0;
    return volume * numericSets;
  }, [volume, numericSets]);

  const cement = useMemo(() => {
    if (!totalVolume) return '0.00';

    if (mix === 'custom') {
      const val = parseFloat(customMix);
      if (isNaN(val)) return '0.00';
      return computeWallFootingCement(totalVolume, val);
    }

    if (!mix) return '0.00';

    return computeWallFootingCement(totalVolume, mix);
  }, [totalVolume, mix, customMix]);

  const sand = useMemo(() => {
    if (!totalVolume) return '0.00';

    if (mix === 'custom') {
      const val = parseFloat(customMix);
      if (isNaN(val)) return '0.00';
      return computeWallFootingSand(totalVolume, val);
    }

    if (!mix) return '0.00';

    return computeWallFootingSand(totalVolume, mix);
  }, [totalVolume, mix, customMix]);

  const gravel = useMemo(() => {
    if (!totalVolume) return '0.00';

    if (mix === 'custom') {
      const val = parseFloat(customMix);
      if (isNaN(val)) return '0.00';
      return computeWallFootingGravel(totalVolume, val);
    }

    if (!mix) return '0.00';

    return computeWallFootingGravel(totalVolume, mix);
  }, [totalVolume, mix, customMix]);

  const reset = () => {
    setSets('');
    setLength('');
    setWidth(null);
    setCustomWidth('');
    setThickness(null);
    setCustomThickness('');
    setMix(null);
    setCustomMix('');
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

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
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
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="square-outline" size={26} color="#1e293b" />
            </View>
            <Text style={styles.title}>Wall Footing</Text>
            <Text style={styles.subtitle}>Concrete footing estimator</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>No. of Sets</Text>
            <TextInput
              value={sets}
              onChangeText={setSets}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Length (m)</Text>
            <TextInput
              value={length}
              onChangeText={setLength}
              style={styles.input}
              keyboardType="numeric"
            />

            {/* Width */}
            <Text style={styles.label}>Width (m)</Text>
            {isAndroid ? (
              <>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenWidth(true)}
                >
                  <Text>{width ?? 'Select width'}</Text>
                </TouchableOpacity>
                {renderAndroidModal(
                  openWidth,
                  setOpenWidth,
                  widthItems,
                  setWidth,
                )}
              </>
            ) : (
              <View style={{ zIndex: 3000 }}>
                <DropDownPicker<WidthValue>
                  open={openWidth}
                  value={width}
                  items={widthItems}
                  setOpen={(val) =>
                    setOpenWidth((prev) => {
                      const next = typeof val === 'function' ? val(prev) : val;
                      if (next) {
                        setOpenThickness(false);
                        setOpenMix(false);
                      }
                      return next;
                    })
                  }
                  setValue={(val) =>
                    setWidth((prev) =>
                      typeof val === 'function' ? val(prev) : val,
                    )
                  }
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            {/* Thickness */}
            <Text style={styles.label}>Thickness (m)</Text>
            {isAndroid ? (
              <>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenThickness(true)}
                >
                  <Text>{thickness ?? 'Select thickness'}</Text>
                </TouchableOpacity>
                {renderAndroidModal(
                  openThickness,
                  setOpenThickness,
                  thicknessItems,
                  setThickness,
                )}
              </>
            ) : (
              <View style={{ zIndex: 2000 }}>
                <DropDownPicker<ThicknessValue>
                  open={openThickness}
                  value={thickness}
                  items={thicknessItems}
                  setOpen={(val) =>
                    setOpenThickness((prev) => {
                      const next = typeof val === 'function' ? val(prev) : val;
                      if (next) {
                        setOpenWidth(false);
                        setOpenMix(false);
                      }
                      return next;
                    })
                  }
                  setValue={(val) =>
                    setThickness((prev) =>
                      typeof val === 'function' ? val(prev) : val,
                    )
                  }
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            {/* Mix */}
            <Text style={styles.label}>Mixture</Text>
            {isAndroid ? (
              <>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenMix(true)}
                >
                  <Text>{mix ?? 'Select mix'}</Text>
                </TouchableOpacity>
                {renderAndroidModal(openMix, setOpenMix, mixItems, setMix)}
              </>
            ) : (
              <View style={{ zIndex: 1000 }}>
                <DropDownPicker<MixValue>
                  open={openMix}
                  value={mix}
                  items={mixItems}
                  setOpen={(val) =>
                    setOpenMix((prev) => {
                      const next = typeof val === 'function' ? val(prev) : val;
                      if (next) {
                        setOpenWidth(false);
                        setOpenThickness(false);
                      }
                      return next;
                    })
                  }
                  setValue={(val) =>
                    setMix((prev) =>
                      typeof val === 'function' ? val(prev) : val,
                    )
                  }
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

          {/* RESULTS */}
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
    backgroundColor: '#fff',
  },

  dropdownContainer: {
    borderColor: '#cbd5e1',
    borderRadius: 12,
  },

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

  modalText: { fontSize: 15 },

  modalCancel: {
    textAlign: 'center',
    marginTop: 12,
    color: '#ef4444',
  },
});
