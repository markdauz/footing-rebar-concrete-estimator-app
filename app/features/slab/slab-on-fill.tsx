import {
  computeComputedKgs,
  computeGIWire,
  computeMainCutBarPcs,
  computeMainCutSize,
  computePCS,
  computePolyethyleneSheet,
  computeSlabVolume,
  computeSteelKg,
  computeTempCutBarPcs,
  computeTempCutSize,
  computeTieWire,
  computeTotalBars,
  computeWastage,
} from '@/utils/slabOnFillCalculator';
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

type Item<T> = { label: string; value: T };

const isAndroid = Platform.OS === 'android';

export default function SlabOnFill() {
  const insets = useSafeAreaInsets();

  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [sets, setSets] = useState('');

  const [slabThickness, setSlabThickness] = useState<string | null>(null);
  const [spacingWidth, setSpacingWidth] = useState<string | null>(null);
  const [spacingLength, setSpacingLength] = useState<string | null>(null);
  const [mainBars, setMainBars] = useState<string | null>(null);
  const [tempBars, setTempBars] = useState<string | null>(null);
  const [steelLength, setSteelLength] = useState<string | null>(null);

  const [openThickness, setOpenThickness] = useState(false);
  const [openSpacingWidth, setOpenSpacingWidth] = useState(false);
  const [openSpacingLength, setOpenSpacingLength] = useState(false);
  const [openMainBars, setOpenMainBars] = useState(false);
  const [openTempBars, setOpenTempBars] = useState(false);
  const [openSteelLength, setOpenSteelLength] = useState(false);

  const thicknessItems: Item<string>[] = [
    { label: '0.10', value: '0.10' },
    { label: '0.11', value: '0.11' },
    { label: '0.12', value: '0.12' },
    { label: '0.125', value: '0.125' },
    { label: '0.15', value: '0.15' },
    { label: '0.175', value: '0.175' },
    { label: '0.20', value: '0.20' },
  ];

  const spacingItems: Item<string>[] = [
    { label: '0.10', value: '0.10' },
    { label: '0.15', value: '0.15' },
    { label: '0.20', value: '0.20' },
    { label: '0.25', value: '0.25' },
    { label: '0.30', value: '0.30' },
    { label: '0.35', value: '0.35' },
    { label: '0.40', value: '0.40' },
    { label: '0.45', value: '0.45' },
    { label: '0.50', value: '0.50' },
    { label: '0.55', value: '0.55' },
    { label: '0.60', value: '0.60' },
  ];

  const barItems: Item<string>[] = [
    { label: '10', value: '10' },
    { label: '12', value: '12' },
    { label: '16', value: '16' },
    { label: '20', value: '20' },
  ];

  const steelLengthItems: Item<string>[] = [
    { label: '6.00', value: '6.00' },
    { label: '7.50', value: '7.50' },
    { label: '9.00', value: '9.00' },
    { label: '10.50', value: '10.50' },
    { label: '12.00', value: '12.00' },
  ];

  const volume = useMemo(() => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    const t = parseFloat(slabThickness || '0');
    const s = parseFloat(sets);

    if (!w || !l || !t || !s) {
      return 0;
    }

    return computeSlabVolume(w, l, t, s);
  }, [width, length, slabThickness, sets]);

  const mainCutBarPcs = useMemo(() => {
    const l = parseFloat(length);
    const spacing = parseFloat(spacingLength || '0');

    if (!l || !spacing) {
      return 0;
    }

    return computeMainCutBarPcs(l, spacing);
  }, [length, spacingLength]);

  const tempCutBarPcs = useMemo(() => {
    const w = parseFloat(width);
    const spacing = parseFloat(spacingWidth || '0');

    if (!w || !spacing) {
      return 0;
    }

    return computeTempCutBarPcs(w, spacing);
  }, [width, spacingWidth]);

  const mainCutSize = useMemo(() => {
    const w = parseFloat(width);
    const bar = parseFloat(mainBars || '0');

    if (!w || !bar) {
      return 0;
    }

    return computeMainCutSize(w, bar);
  }, [width, mainBars]);

  const tempCutSize = useMemo(() => {
    const l = parseFloat(length);
    const bar = parseFloat(tempBars || '0');

    if (!l || !bar) {
      return 0;
    }

    return computeTempCutSize(l, bar);
  }, [length, tempBars]);

  const mainWastage = useMemo(() => {
    const steel = parseFloat(steelLength || '0');

    if (!steel || !mainCutSize) {
      return 0;
    }

    return computeWastage(steel, mainCutSize);
  }, [steelLength, mainCutSize]);

  const tempWastage = useMemo(() => {
    const steel = parseFloat(steelLength || '0');

    if (!steel || !tempCutSize) {
      return 0;
    }

    return computeWastage(steel, tempCutSize);
  }, [steelLength, tempCutSize]);

  const bothExceeded =
    mainCutSize > Number(steelLength) && tempCutSize > Number(steelLength);

  const mainTotalBars = useMemo(() => {
    const s = parseFloat(sets);
    const steel = parseFloat(steelLength || '0');

    if (!mainCutBarPcs || !s || !mainCutSize || !steel) {
      return 0;
    }

    return computeTotalBars(mainCutBarPcs, s, mainCutSize, steel, bothExceeded);
  }, [mainCutBarPcs, sets, mainCutSize, steelLength, bothExceeded]);

  const tempTotalBars = useMemo(() => {
    const s = parseFloat(sets);
    const steel = parseFloat(steelLength || '0');

    if (!tempCutBarPcs || !s || !tempCutSize || !steel) {
      return 0;
    }

    return computeTotalBars(tempCutBarPcs, s, tempCutSize, steel, bothExceeded);
  }, [tempCutBarPcs, sets, tempCutSize, steelLength, bothExceeded]);

  const mainKgs = useMemo(() => {
    const bar = Number(mainBars);
    const steel = parseFloat(steelLength || '0');

    if (!mainTotalBars || !bar || !steel) {
      return 0;
    }

    return computeSteelKg(mainTotalBars, steel, bar);
  }, [mainTotalBars, mainBars, steelLength]);

  const tempKgs = useMemo(() => {
    const bar = Number(tempBars);
    const steel = parseFloat(steelLength || '0');

    if (!tempTotalBars || !bar || !steel) {
      return 0;
    }

    return computeSteelKg(tempTotalBars, steel, bar);
  }, [tempTotalBars, tempBars, steelLength]);

  const steelKgsCum = useMemo(() => {
    const main = Number(mainKgs);
    const temp = Number(tempKgs);

    return main + temp;
  }, [mainKgs, tempKgs]);

  const giWire = useMemo(() => {
    const s = parseFloat(sets);

    if (!mainCutBarPcs || !tempCutBarPcs || !s) {
      return 0;
    }

    return computeGIWire(mainCutBarPcs, tempCutBarPcs, s);
  }, [mainCutBarPcs, tempCutBarPcs, sets]);

  const polyethyleneSheet = useMemo(() => {
    const s = parseFloat(sets);
    const w = parseFloat(width);
    const l = parseFloat(length);

    if (!s || !w || !l) {
      return 0;
    }

    return computePolyethyleneSheet(s, w, l);
  }, [sets, width, length]);

  const computedKgs = useMemo(() => {
    if (!volume) {
      return 0;
    }

    return computeComputedKgs(90, volume);
  }, [volume]);

  const tieWire = useMemo(() => {
    if (!computedKgs) {
      return 0;
    }

    return computeTieWire(computedKgs);
  }, [computedKgs]);

  const computedPcs = useMemo(() => {
    const bar = parseFloat(mainBars || '0');
    const steel = parseFloat(steelLength || '0');

    if (!computedKgs || !bar || !steel) {
      return 0;
    }

    return computePCS(computedKgs, bar, steel);
  }, [computedKgs, mainBars, steelLength]);

  const reset = () => {
    setWidth('');
    setLength('');
    setSets('');
    setSlabThickness(null);
    setSpacingWidth(null);
    setSpacingLength(null);
    setMainBars(null);
    setTempBars(null);
    setSteelLength(null);
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

  function renderDropdown(
    label: string,
    value: string | null,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: any,
    items: Item<string>[],
    placeholder: string,
    zIndex: number,
  ) {
    return (
      <>
        <Text style={styles.label}>{label}</Text>

        {isAndroid ? (
          <>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOpen(true)}
            >
              <Text>
                {value
                  ? items.find((i) => i.value === value)?.label
                  : placeholder}
              </Text>
            </TouchableOpacity>

            {renderAndroidModal(open, setOpen, items, setValue)}
          </>
        ) : (
          <View style={{ zIndex }}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              listMode="SCROLLVIEW"
              placeholder={placeholder}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        )}
      </>
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
              <Ionicons name="grid-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Slab on Fill</Text>
            <Text style={styles.subtitle}>Slab on fill estimator</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Width (m)</Text>
            <TextInput
              value={width}
              onChangeText={setWidth}
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

            {renderDropdown(
              'Slab Thickness (m)',
              slabThickness,
              openThickness,
              setOpenThickness,
              setSlabThickness,
              thicknessItems,
              'Select thickness',
              6000,
            )}

            <Text style={styles.label}># of Sets</Text>
            <TextInput
              value={sets}
              onChangeText={setSets}
              style={styles.input}
              keyboardType="numeric"
            />

            {renderDropdown(
              'Spacing @ Width (m)',
              spacingWidth,
              openSpacingWidth,
              setOpenSpacingWidth,
              setSpacingWidth,
              spacingItems,
              'Select spacing',
              5000,
            )}

            {renderDropdown(
              'Spacing @ Length (m)',
              spacingLength,
              openSpacingLength,
              setOpenSpacingLength,
              setSpacingLength,
              spacingItems,
              'Select spacing',
              4000,
            )}

            {renderDropdown(
              'Bar Diam Ø Main Bars (mm)',
              mainBars,
              openMainBars,
              setOpenMainBars,
              setMainBars,
              barItems,
              'Select main bars',
              3000,
            )}

            {renderDropdown(
              'Bar Diam Ø Temp Bars (mm)',
              tempBars,
              openTempBars,
              setOpenTempBars,
              setTempBars,
              barItems,
              'Select temp bars',
              2000,
            )}

            {renderDropdown(
              'Steel Length',
              steelLength,
              openSteelLength,
              setOpenSteelLength,
              setSteelLength,
              steelLengthItems,
              'Select steel length',
              1000,
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result label="Volume" value={`${volume.toFixed(3)} cu.m`} />

            <Result label="Steel kgs/cu.m" value={`${steelKgsCum}`} />

            <Result
              label="Main Bars + 9d Hook Cut Bar Pcs"
              value={`${mainCutBarPcs}`}
            />

            <Result
              label="Main Bars + 9d Hook Cut Size"
              value={`${mainCutSize}`}
            />

            <Result
              label="Main Bars + 9d Hook Wastage/Bar"
              value={`${mainWastage}`}
            />

            <Result
              label="Temp Bars + 9d Hook Cut Bar Pcs"
              value={`${tempCutBarPcs}`}
            />

            <Result
              label="Temp Bars + 9d Hook Cut Size"
              value={`${tempCutSize}`}
            />

            <Result
              label="Temp Bars + 9d Hook Wastage/Bar"
              value={`${tempWastage}`}
            />

            <Result
              label="Total Pcs of Bars (Main)"
              value={`${mainTotalBars}`}
            />

            <Result
              label="Total Pcs of Bars (Main) Length"
              value={steelLength ? `@${steelLength}m` : '-'}
            />

            <Result label="Total Pcs of Bars (Main) Kgs" value={`${mainKgs}`} />

            <Result
              label="Total Pcs of Bars (Temp)"
              value={`${tempTotalBars}`}
            />

            <Result
              label="Total Pcs of Bars (Temp) Length"
              value={steelLength ? `@${steelLength}m` : '-'}
            />

            <Result label="Total Pcs of Bars (Temp) Kgs" value={`${tempKgs}`} />

            <Result label="#16 G.I Wire (kg)" value={`${giWire}`} />

            <Result
              label="Polyethylene Sheet (sqm)"
              value={`${polyethyleneSheet}`}
            />

            <Result label="Computed Quantity via Volume Method" value={`90`} />

            <Result
              label={`${steelLength}m Length Kgs`}
              value={`${computedKgs}`}
            />

            <Result label="Tie Wire (kgs)" value={`${tieWire}`} />

            <Result label="PCS" value={`${computedPcs}`} />
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
  },

  modalCancel: {
    textAlign: 'center',
    marginTop: 12,
    color: '#ef4444',
    fontWeight: '600',
  },
});
