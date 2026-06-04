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

type Item<T> = { label: string; value: T };

const isAndroid = Platform.OS === 'android';

export default function SlabOnFill() {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [sets, setSets] = useState('');

  const [slabThicknessMode, setSlabThicknessMode] = useState<string | null>(
    null,
  );
  const [spacingWidthMode, setSpacingWidthMode] = useState<string | null>(null);
  const [spacingLengthMode, setSpacingLengthMode] = useState<string | null>(
    null,
  );
  const [mainBarsMode, setMainBarsMode] = useState<string | null>(null);
  const [tempBarsMode, setTempBarsMode] = useState<string | null>(null);
  const [steelLengthMode, setSteelLengthMode] = useState<string | null>(null);

  const [slabThickness, setSlabThickness] = useState('');
  const [spacingWidth, setSpacingWidth] = useState('');
  const [spacingLength, setSpacingLength] = useState('');
  const [mainBars, setMainBars] = useState('');
  const [tempBars, setTempBars] = useState('');
  const [steelLength, setSteelLength] = useState('');

  const [openThickness, setOpenThickness] = useState(false);
  const [openSpacingWidth, setOpenSpacingWidth] = useState(false);
  const [openSpacingLength, setOpenSpacingLength] = useState(false);
  const [openMainBars, setOpenMainBars] = useState(false);
  const [openTempBars, setOpenTempBars] = useState(false);
  const [openSteelLength, setOpenSteelLength] = useState(false);

  const [kgsPerCum, setKgsPerCum] = useState('');

  const thicknessItems: Item<string>[] = [
    { label: '0.10', value: '0.10' },
    { label: '0.11', value: '0.11' },
    { label: '0.12', value: '0.12' },
    { label: '0.125', value: '0.125' },
    { label: '0.15', value: '0.15' },
    { label: '0.175', value: '0.175' },
    { label: '0.20', value: '0.20' },
    { label: 'Custom', value: 'custom' },
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
    { label: 'Custom', value: 'custom' },
  ];

  const barItems: Item<string>[] = [
    { label: '10', value: '10' },
    { label: '12', value: '12' },
    { label: '16', value: '16' },
    { label: '20', value: '20' },
    { label: 'Custom', value: 'custom' },
  ];

  const steelLengthItems: Item<string>[] = [
    { label: '6.00', value: '6.00' },
    { label: '7.50', value: '7.50' },
    { label: '9.00', value: '9.00' },
    { label: '10.50', value: '10.50' },
    { label: '12.00', value: '12.00' },
    { label: 'Custom', value: 'custom' },
  ];

  //
  const effectiveThickness =
    slabThicknessMode === 'custom'
      ? parseFloat(slabThickness)
      : slabThicknessMode
        ? parseFloat(slabThicknessMode)
        : NaN;

  const effectiveSpacingWidth =
    spacingWidthMode === 'custom'
      ? parseFloat(spacingWidth)
      : spacingWidthMode
        ? parseFloat(spacingWidthMode)
        : NaN;

  const effectiveSpacingLength =
    spacingLengthMode === 'custom'
      ? parseFloat(spacingLength)
      : spacingLengthMode
        ? parseFloat(spacingLengthMode)
        : NaN;

  const effectiveMainBars =
    mainBarsMode === 'custom'
      ? parseFloat(mainBars)
      : mainBarsMode
        ? parseFloat(mainBarsMode)
        : NaN;

  const effectiveTempBars =
    tempBarsMode === 'custom'
      ? parseFloat(tempBars)
      : tempBarsMode
        ? parseFloat(tempBarsMode)
        : NaN;

  const effectiveSteelLength =
    steelLengthMode === 'custom'
      ? parseFloat(steelLength)
      : steelLengthMode
        ? parseFloat(steelLengthMode)
        : NaN;

  const volume = useMemo(() => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    const t = effectiveThickness;
    const s = parseFloat(sets);

    if (!w || !l || !t || !s) {
      return 0;
    }

    return computeSlabVolume(w, l, t, s);
  }, [width, length, effectiveThickness, sets]);

  const mainCutBarPcs = useMemo(() => {
    const l = parseFloat(length);
    const spacing = effectiveSpacingLength;

    if (!l || !spacing) {
      return 0;
    }

    return computeMainCutBarPcs(l, spacing);
  }, [length, effectiveSpacingLength]);

  const tempCutBarPcs = useMemo(() => {
    const w = parseFloat(width);
    const spacing = effectiveSpacingWidth;

    if (!w || !spacing) {
      return 0;
    }

    return computeTempCutBarPcs(w, spacing);
  }, [width, effectiveSpacingWidth]);

  const mainCutSize = useMemo(() => {
    const w = parseFloat(width);
    const bar = effectiveMainBars;

    if (!w || !bar) {
      return 0;
    }

    return computeMainCutSize(w, bar);
  }, [width, effectiveMainBars]);

  const tempCutSize = useMemo(() => {
    const l = parseFloat(length);
    const bar = effectiveTempBars;

    if (!l || !bar) {
      return 0;
    }

    return computeTempCutSize(l, bar);
  }, [length, effectiveTempBars]);

  const mainWastage = useMemo(() => {
    const steel = effectiveSteelLength;

    if (!steel || !mainCutSize) {
      return 0;
    }

    return computeWastage(steel, mainCutSize);
  }, [effectiveSteelLength, mainCutSize]);

  const tempWastage = useMemo(() => {
    const steel = effectiveSteelLength;

    if (!steel || !tempCutSize) {
      return 0;
    }

    return computeWastage(steel, tempCutSize);
  }, [effectiveSteelLength, tempCutSize]);

  const bothExceeded =
    mainCutSize > effectiveSteelLength && tempCutSize > effectiveSteelLength;

  const mainTotalBars = useMemo(() => {
    const s = parseFloat(sets);
    const steel = effectiveSteelLength;

    if (!mainCutBarPcs || !s || !mainCutSize || !steel) {
      return 0;
    }

    return computeTotalBars(mainCutBarPcs, s, mainCutSize, steel, bothExceeded);
  }, [mainCutBarPcs, sets, mainCutSize, effectiveSteelLength, bothExceeded]);

  const tempTotalBars = useMemo(() => {
    const s = parseFloat(sets);
    const steel = effectiveSteelLength;

    if (!tempCutBarPcs || !s || !tempCutSize || !steel) {
      return 0;
    }

    return computeTotalBars(tempCutBarPcs, s, tempCutSize, steel, bothExceeded);
  }, [tempCutBarPcs, sets, tempCutSize, effectiveSteelLength, bothExceeded]);

  const mainKgs = useMemo(() => {
    const bar = effectiveMainBars;
    const steel = effectiveSteelLength;

    if (!mainTotalBars || !bar || !steel) {
      return 0;
    }

    return computeSteelKg(mainTotalBars, steel, bar);
  }, [mainTotalBars, effectiveMainBars, effectiveSteelLength]);

  const tempKgs = useMemo(() => {
    const bar = effectiveTempBars;
    const steel = effectiveSteelLength;

    if (!tempTotalBars || !bar || !steel) {
      return 0;
    }

    return computeSteelKg(tempTotalBars, steel, bar);
  }, [tempTotalBars, effectiveTempBars, effectiveSteelLength]);

  const steelKgsCum = useMemo(() => {
    return Number(mainKgs) + Number(tempKgs);
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

    const customValue = parseFloat(kgsPerCum || '0');

    const finalValue = customValue > 0 ? customValue : 90;

    return computeComputedKgs(finalValue, volume);
  }, [kgsPerCum, volume]);

  const tieWire = useMemo(() => {
    if (!computedKgs) {
      return 0;
    }

    return computeTieWire(computedKgs);
  }, [computedKgs]);

  const computedPcs = useMemo(() => {
    const bar = effectiveMainBars;
    const steel = effectiveSteelLength;

    if (!computedKgs || !bar || !steel) {
      return 0;
    }

    return computePCS(computedKgs, bar, steel);
  }, [computedKgs, effectiveMainBars, effectiveSteelLength]);

  const steelLengths = [6, 7.5, 9, 10.5, 12];

  function computeBarsPerLength(cutSize: number, selectedSteelLength: number) {
    if (!cutSize || !selectedSteelLength) {
      return 0;
    }

    if (selectedSteelLength / cutSize < 1) {
      return Math.round(
        (Math.trunc(cutSize / selectedSteelLength + 1) * selectedSteelLength) /
          selectedSteelLength,
      );
    }

    return Math.trunc(selectedSteelLength / cutSize);
  }

  function computeRemarks(cutSize: number, selectedSteelLength: number) {
    if (!cutSize || !selectedSteelLength) {
      return '-';
    }

    return selectedSteelLength / cutSize < 1 ? '> than length' : 'ok';
  }

  function computeTotalSteelBars(
    cutBarPcs: number,
    setsValue: number,
    cutSize: number,
    selectedSteelLength: number,
  ) {
    if (!cutBarPcs || !setsValue || !cutSize || !selectedSteelLength) {
      return 0;
    }

    const barsPerPiece = Math.trunc(selectedSteelLength / cutSize);

    if (barsPerPiece <= 0) {
      const joinedBars = Math.trunc(cutSize / selectedSteelLength + 1);

      return Number(((cutBarPcs / joinedBars) * setsValue).toFixed(2));
    }

    return Number(((cutBarPcs / barsPerPiece) * setsValue).toFixed(2));
  }

  function computeLengthWastage(stockLength: number, cutSize: number) {
    if (!stockLength || !cutSize) {
      return 0;
    }

    if (stockLength / cutSize < 1) {
      return Number(
        (
          Math.trunc(cutSize / stockLength + 1) * stockLength -
          cutSize -
          0.6
        ).toFixed(2),
      );
    }

    return Number(
      (stockLength - Math.trunc(stockLength / cutSize) * cutSize).toFixed(2),
    );
  }

  const mainBarsOverview = useMemo(() => {
    const cutSize = Number(mainCutSize);
    const cutBarPcs = Number(mainCutBarPcs);
    const s = Number(sets);
    const steel = effectiveSteelLength;

    if (!cutSize) {
      return {
        pcsFromLength: 0,
        remarks: '-',
        totalPcs: 0,
        wastages: [0, 0, 0, 0, 0],
        minimum: 0,
      };
    }

    const wastages = steelLengths.map((len) =>
      computeLengthWastage(len, cutSize),
    );

    return {
      pcsFromLength: computeBarsPerLength(cutSize, steel),

      remarks: computeRemarks(cutSize, steel),

      totalPcs: computeTotalSteelBars(cutBarPcs, s, cutSize, steel),

      wastages,

      minimum: Math.min(...wastages),
    };
  }, [mainCutSize, mainCutBarPcs, sets, effectiveSteelLength]);

  const tempBarsOverview = useMemo(() => {
    const cutSize = Number(tempCutSize);
    const cutBarPcs = Number(tempCutBarPcs);
    const s = Number(sets);
    const steel = effectiveSteelLength;

    if (!cutSize) {
      return {
        pcsFromLength: 0,
        remarks: '-',
        totalPcs: 0,
        wastages: [0, 0, 0, 0, 0],
        minimum: 0,
      };
    }

    const wastages = steelLengths.map((len) =>
      computeLengthWastage(len, cutSize),
    );

    return {
      pcsFromLength: computeBarsPerLength(cutSize, steel),

      remarks: computeRemarks(cutSize, steel),

      totalPcs: computeTotalSteelBars(cutBarPcs, s, cutSize, steel),

      wastages,

      minimum: Math.min(...wastages),
    };
  }, [tempCutSize, tempCutBarPcs, sets, effectiveSteelLength]);

  const hasRequiredValues =
    width &&
    length &&
    sets &&
    effectiveThickness &&
    effectiveSpacingWidth &&
    effectiveSpacingLength &&
    effectiveMainBars &&
    effectiveTempBars &&
    effectiveSteelLength;

  useEffect(() => {
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
  }, [hasRequiredValues]);

  const reset = () => {
    setWidth('');
    setLength('');
    setSets('');

    setSlabThicknessMode(null);
    setSpacingWidthMode(null);
    setSpacingLengthMode(null);
    setMainBarsMode(null);
    setTempBarsMode(null);
    setSteelLengthMode(null);

    setSlabThickness('');
    setSpacingWidth('');
    setSpacingLength('');
    setMainBars('');
    setTempBars('');
    setSteelLength('');

    setKgsPerCum('');

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
              dropDownDirection="BOTTOM"
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
            <Text style={styles.subtitle}>Slab on Fill or Slab on Grade</Text>
          </View>

          <View style={styles.card}>
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

            <Text style={styles.label}>Slab Thickness (m)</Text>

            {slabThicknessMode === 'custom' ? (
              <>
                <TextInput
                  value={slabThickness}
                  onChangeText={setSlabThickness}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  placeholder="Enter value"
                />

                <TouchableOpacity
                  onPress={() => {
                    setSlabThicknessMode(null);
                    setSlabThickness('');
                  }}
                >
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
                    {slabThicknessMode
                      ? thicknessItems.find(
                          (i) => i.value === slabThicknessMode,
                        )?.label
                      : 'Select thickness'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openThickness,
                  setOpenThickness,
                  thicknessItems,
                  (val) => {
                    if (val === 'custom') {
                      setSlabThickness('');
                    }

                    setSlabThicknessMode(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 6000 }}>
                <DropDownPicker
                  open={openThickness}
                  value={slabThicknessMode}
                  items={thicknessItems}
                  setOpen={setOpenThickness}
                  setValue={setSlabThicknessMode}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  dropDownDirection="BOTTOM"
                />
              </View>
            )}

            <Text style={styles.label}># of Sets</Text>

            <TextInput
              value={sets}
              onChangeText={setSets}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter value"
            />

            <Text style={styles.label}>Spacing @ Width (m)</Text>

            {spacingWidthMode === 'custom' ? (
              <>
                <TextInput
                  value={spacingWidth}
                  onChangeText={setSpacingWidth}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  placeholder="Enter value"
                />

                <TouchableOpacity
                  onPress={() => {
                    setSpacingWidthMode(null);
                    setSpacingWidth('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenSpacingWidth(true)}
                >
                  <Text>
                    {spacingWidthMode
                      ? spacingItems.find((i) => i.value === spacingWidthMode)
                          ?.label
                      : 'Select spacing'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openSpacingWidth,
                  setOpenSpacingWidth,
                  spacingItems,
                  (val) => {
                    if (val === 'custom') {
                      setSpacingWidth('');
                    }

                    setSpacingWidthMode(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 5000 }}>
                <DropDownPicker
                  open={openSpacingWidth}
                  value={spacingWidthMode}
                  items={spacingItems}
                  setOpen={setOpenSpacingWidth}
                  setValue={setSpacingWidthMode}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  dropDownDirection="BOTTOM"
                />
              </View>
            )}

            <Text style={styles.label}>Spacing @ Length (m)</Text>

            {spacingLengthMode === 'custom' ? (
              <>
                <TextInput
                  value={spacingLength}
                  onChangeText={setSpacingLength}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  placeholder="Enter value"
                />

                <TouchableOpacity
                  onPress={() => {
                    setSpacingLengthMode(null);
                    setSpacingLength('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenSpacingLength(true)}
                >
                  <Text>
                    {spacingLengthMode
                      ? spacingItems.find((i) => i.value === spacingLengthMode)
                          ?.label
                      : 'Select spacing'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openSpacingLength,
                  setOpenSpacingLength,
                  spacingItems,
                  (val) => {
                    if (val === 'custom') {
                      setSpacingLength('');
                    }

                    setSpacingLengthMode(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 4000 }}>
                <DropDownPicker
                  open={openSpacingLength}
                  value={spacingLengthMode}
                  items={spacingItems}
                  setOpen={setOpenSpacingLength}
                  setValue={setSpacingLengthMode}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  dropDownDirection="BOTTOM"
                />
              </View>
            )}

            <Text style={styles.label}>Bar Diam Ø Main Bars (mm)</Text>

            {mainBarsMode === 'custom' ? (
              <>
                <TextInput
                  value={mainBars}
                  onChangeText={setMainBars}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  placeholder="Enter value"
                />

                <TouchableOpacity
                  onPress={() => {
                    setMainBarsMode(null);
                    setMainBars('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenMainBars(true)}
                >
                  <Text>
                    {mainBarsMode
                      ? barItems.find((i) => i.value === mainBarsMode)?.label
                      : 'Select main bars'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openMainBars,
                  setOpenMainBars,
                  barItems,
                  (val) => {
                    if (val === 'custom') {
                      setMainBars('');
                    }

                    setMainBarsMode(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 3000 }}>
                <DropDownPicker
                  open={openMainBars}
                  value={mainBarsMode}
                  items={barItems}
                  setOpen={setOpenMainBars}
                  setValue={setMainBarsMode}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  dropDownDirection="BOTTOM"
                />
              </View>
            )}

            <Text style={styles.label}>Bar Diam Ø Temp Bars (mm)</Text>

            {tempBarsMode === 'custom' ? (
              <>
                <TextInput
                  value={tempBars}
                  onChangeText={setTempBars}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  placeholder="Enter value"
                />

                <TouchableOpacity
                  onPress={() => {
                    setTempBarsMode(null);
                    setTempBars('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenTempBars(true)}
                >
                  <Text>
                    {tempBarsMode
                      ? barItems.find((i) => i.value === tempBarsMode)?.label
                      : 'Select temp bars'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openTempBars,
                  setOpenTempBars,
                  barItems,
                  (val) => {
                    if (val === 'custom') {
                      setTempBars('');
                    }

                    setTempBarsMode(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 2000 }}>
                <DropDownPicker
                  open={openTempBars}
                  value={tempBarsMode}
                  items={barItems}
                  setOpen={setOpenTempBars}
                  setValue={setTempBarsMode}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  dropDownDirection="BOTTOM"
                />
              </View>
            )}

            <Text style={styles.label}>Steel Length</Text>

            {steelLengthMode === 'custom' ? (
              <>
                <TextInput
                  value={steelLength}
                  onChangeText={setSteelLength}
                  keyboardType="decimal-pad"
                  style={styles.input}
                  placeholder="Enter value"
                />

                <TouchableOpacity
                  onPress={() => {
                    setSteelLengthMode(null);
                    setSteelLength('');
                  }}
                >
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenSteelLength(true)}
                >
                  <Text>
                    {steelLengthMode
                      ? steelLengthItems.find(
                          (i) => i.value === steelLengthMode,
                        )?.label
                      : 'Select steel length'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openSteelLength,
                  setOpenSteelLength,
                  steelLengthItems,
                  (val) => {
                    if (val === 'custom') {
                      setSteelLength('');
                    }

                    setSteelLengthMode(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 1000 }}>
                <DropDownPicker
                  open={openSteelLength}
                  value={steelLengthMode}
                  items={steelLengthItems}
                  setOpen={setOpenSteelLength}
                  setValue={setSteelLengthMode}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  dropDownDirection="BOTTOM"
                />
              </View>
            )}

            <Text style={styles.label}>kgs/cu.m (input own value)</Text>

            <TextInput
              value={kgsPerCum}
              onChangeText={setKgsPerCum}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter value (optional)"
            />

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
            <>
              <View style={styles.resultCard}>
                <Text style={styles.resultTitle}>Results</Text>

                <Result label="Volume" value={`${volume.toFixed(3)} cu.m`} />

                <Result
                  label="Main Bars + 9d Hook Cut Bar Pcs"
                  value={`${mainCutBarPcs}`}
                />

                <Result label="Main Bars Cut Size" value={`${mainCutSize}`} />

                <Result
                  label="Main Bars Wastage/Bar"
                  value={`${mainWastage}`}
                />

                <Result
                  label="Temp Bars + 9d Hook Cut Bar Pcs"
                  value={`${tempCutBarPcs}`}
                />

                <Result label="Temp Bars Cut Size" value={`${tempCutSize}`} />

                <Result
                  label="Temp Bars Wastage/Bar"
                  value={`${tempWastage}`}
                />

                <Result
                  label="Total Pcs of Bars (Main)"
                  value={`${mainTotalBars}`}
                />

                <Result
                  label="Steel Length"
                  value={
                    effectiveSteelLength ? `@${effectiveSteelLength}m` : '-'
                  }
                />

                <Result label="Bars (Main) Kgs" value={`${mainKgs}`} />

                <Result
                  label="Total Pcs of Bars (Temp)"
                  value={`${tempTotalBars}`}
                />

                <Result
                  label="Steel Length"
                  value={
                    effectiveSteelLength ? `@${effectiveSteelLength}m` : '-'
                  }
                />

                <Result label="Bars (Temp) Kgs" value={`${tempKgs}`} />

                <Result label="#16 G.I Wire (kg)" value={`${giWire}`} />

                <Result
                  label="Polyethylene Sheet (sqm)"
                  value={`${polyethyleneSheet}`}
                />

                <Result
                  label="Computed Quantity via Volume Method"
                  value={kgsPerCum && Number(kgsPerCum) > 0 ? kgsPerCum : '90'}
                />

                <Result label={`Kgs`} value={`${computedKgs}`} />

                <Result label="Tie Wire (kgs)" value={`${tieWire}`} />

                <Result
                  label="Steel Length"
                  value={
                    effectiveSteelLength ? `@${effectiveSteelLength}m` : '-'
                  }
                />

                <Result label="PCS" value={`${computedPcs}`} />
              </View>
              <View style={[styles.resultCard, { marginTop: 18 }]}>
                <View style={styles.overviewCard}>
                  <Text style={styles.resultTitle}>
                    Overview of Wastage from Different Steel Length
                  </Text>

                  <View style={styles.overviewSection}>
                    <Text style={styles.overviewHeading}>
                      Main Bars + 9d Hook
                    </Text>

                    <Result
                      label="# pcs from length/# of bars"
                      value={`${mainBarsOverview.pcsFromLength}`}
                    />

                    <Result label="Remarks" value={mainBarsOverview.remarks} />

                    <Result
                      label="Total pcs of steel bar"
                      value={mainBarsOverview.totalPcs.toFixed(2)}
                    />

                    <Result
                      label="6m Wastage"
                      value={mainBarsOverview.wastages[0].toFixed(2)}
                    />

                    <Result
                      label="7.5m Wastage"
                      value={mainBarsOverview.wastages[1].toFixed(2)}
                    />

                    <Result
                      label="9m Wastage"
                      value={mainBarsOverview.wastages[2].toFixed(2)}
                    />

                    <Result
                      label="10.5m Wastage"
                      value={mainBarsOverview.wastages[3].toFixed(2)}
                    />

                    <Result
                      label="12m Wastage"
                      value={mainBarsOverview.wastages[4].toFixed(2)}
                    />

                    <Result
                      label="Minimum Wastage"
                      value={mainBarsOverview.minimum.toFixed(2)}
                    />
                  </View>

                  <View style={styles.overviewSection}>
                    <Text style={styles.overviewHeading}>
                      Temp Bars + 9d Hook
                    </Text>

                    <Result
                      label="# pcs from length/# of bars"
                      value={`${tempBarsOverview.pcsFromLength}`}
                    />

                    <Result label="Remarks" value={tempBarsOverview.remarks} />

                    <Result
                      label="Total pcs of steel bar"
                      value={tempBarsOverview.totalPcs.toFixed(2)}
                    />

                    <Result
                      label="6m Wastage"
                      value={tempBarsOverview.wastages[0].toFixed(2)}
                    />

                    <Result
                      label="7.5m Wastage"
                      value={tempBarsOverview.wastages[1].toFixed(2)}
                    />

                    <Result
                      label="9m Wastage"
                      value={tempBarsOverview.wastages[2].toFixed(2)}
                    />

                    <Result
                      label="10.5m Wastage"
                      value={tempBarsOverview.wastages[3].toFixed(2)}
                    />

                    <Result
                      label="12m Wastage"
                      value={tempBarsOverview.wastages[4].toFixed(2)}
                    />

                    <Result
                      label="Minimum Wastage"
                      value={tempBarsOverview.minimum.toFixed(2)}
                    />
                  </View>
                </View>
              </View>
            </>
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
  overviewCard: {
    marginTop: 18,
  },

  overviewSection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },

  overviewHeading: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  androidInput: {
    justifyContent: 'center',
  },

  backText: {
    color: '#2563EB',
    marginTop: 6,
    fontSize: 13,
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
