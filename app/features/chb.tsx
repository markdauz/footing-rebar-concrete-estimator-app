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
  computeCHBTotal,
  computeCHBVolBetween,
  computeCHBVolume,
  getEndWeb,
  getInnerWeb,
  getShell,
} from '../../utils/chbCalculator';

type ThicknessValue = '0.10' | '0.125' | '0.15' | '0.20' | 'custom';
type WebValue = 2 | 3 | 4;
type ClassValue = 12 | 9 | 7.5;

type Item<T> = { label: string; value: T };

const isAndroid = Platform.OS === 'android';

export default function CHB() {
  const insets = useSafeAreaInsets();

  const [thicknessMode, setThicknessMode] = useState<ThicknessValue | null>(
    null,
  );
  const [thickness, setThickness] = useState('');
  const [webs, setWebs] = useState<WebValue | null>(null);
  const [cementClass, setCementClass] = useState<ClassValue | null>(null);

  const [openThickness, setOpenThickness] = useState(false);
  const [openWebs, setOpenWebs] = useState(false);
  const [openClass, setOpenClass] = useState(false);

  const [wallArea, setWallArea] = useState('');

  const thicknessItems: Item<ThicknessValue>[] = [
    { label: '0.10', value: '0.10' },
    { label: '0.125', value: '0.125' },
    { label: '0.15', value: '0.15' },
    { label: '0.20', value: '0.20' },
    { label: 'Custom', value: 'custom' },
  ];

  const webItems: Item<WebValue>[] = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];

  const classItems: Item<ClassValue>[] = [
    { label: 'B (12)', value: 12 },
    { label: 'C (9)', value: 9 },
    { label: 'D (7.5)', value: 7.5 },
  ];

  const effectiveThickness =
    thicknessMode === 'custom'
      ? parseFloat(thickness)
      : thicknessMode
        ? parseFloat(thicknessMode)
        : NaN;

  const numericWebs = webs ?? NaN;

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

  const cement = useMemo(() => {
    if (!cementClass) return 0;
    return totalVol * cementClass;
  }, [totalVol, cementClass]);

  const bags = useMemo(() => {
    const area = parseFloat(wallArea || '0');

    if (!area || !cement) {
      return 0;
    }

    return area * cement;
  }, [wallArea, cement]);

  const reset = () => {
    setThickness('');
    setThicknessMode(null);
    setWebs(null);
    setCementClass(null);
    setWallArea('');
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
              <Ionicons name="cube" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>CHB Mortar/SQM</Text>

            <Text style={styles.subtitle}>Volume method</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>CHB Thickness</Text>

            {thicknessMode === 'custom' ? (
              <>
                <TextInput
                  value={thickness}
                  onChangeText={setThickness}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Enter value"
                />

                <TouchableOpacity onPress={() => setThicknessMode(null)}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenThickness(true)}
                >
                  <Text>
                    {thicknessMode
                      ? thicknessItems.find((i) => i.value === thicknessMode)
                          ?.label
                      : 'Select thickness'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openThickness,
                  setOpenThickness,
                  thicknessItems,
                  (val) => {
                    if (val === 'custom') setThickness('');
                    setThicknessMode(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 1000 }}>
                <DropDownPicker
                  open={openThickness}
                  value={thicknessMode}
                  items={thicknessItems}
                  setOpen={setOpenThickness}
                  setValue={setThicknessMode}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <Text style={styles.label}># of Web</Text>

            {isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenWebs(true)}
                >
                  <Text>{webs ?? 'Select webs'}</Text>
                </TouchableOpacity>

                {renderAndroidModal(openWebs, setOpenWebs, webItems, setWebs)}
              </>
            ) : (
              <View style={{ zIndex: 900 }}>
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
            )}

            <Text style={styles.label}>Class</Text>

            {isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenClass(true)}
                >
                  <Text>
                    {cementClass
                      ? classItems.find((i) => i.value === cementClass)?.label
                      : 'Select class'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openClass,
                  setOpenClass,
                  classItems,
                  setCementClass,
                )}
              </>
            ) : (
              <View style={{ zIndex: 800 }}>
                <DropDownPicker
                  open={openClass}
                  value={cementClass}
                  items={classItems}
                  setOpen={setOpenClass}
                  setValue={setCementClass}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <Text style={styles.label}>Wall Area (input in m2)</Text>

            <TextInput
              value={wallArea}
              onChangeText={setWallArea}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter value"
            />

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result label="End Web" value={String(endWeb || '-')} />
            <Result label="Inner Web" value={String(innerWeb || '-')} />
            <Result label="Shell" value={String(shell || '-')} />
            <Result label="Volume" value={`${volume.toFixed(3)} m³`} />
            <Result label="Vol Between" value={`${volBetween.toFixed(3)} m³`} />
            <Result label="Total Vol" value={`${totalVol.toFixed(4)} m³`} />
            <Result label="Cement" value={`${cement.toFixed(3)} m³`} />
            <Result label="Bags" value={`${bags.toFixed(3)}`} />
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

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
    marginTop: 14,
    marginBottom: 6,
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
});
