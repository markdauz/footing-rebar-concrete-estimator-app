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

export default function SuspendedSlab() {
  const insets = useSafeAreaInsets();

  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [slabThickness, setSlabThickness] = useState('');
  const [sets, setSets] = useState('');

  const [spacingWidth, setSpacingWidth] = useState('');
  const [spacingLength, setSpacingLength] = useState('');

  const [mainBars, setMainBars] = useState('');
  const [tempBars, setTempBars] = useState('');

  const [steelLength, setSteelLength] = useState('');

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

  const [openThickness, setOpenThickness] = useState(false);

  const [openSpacingWidth, setOpenSpacingWidth] = useState(false);

  const [openSpacingLength, setOpenSpacingLength] = useState(false);

  const [openMainBars, setOpenMainBars] = useState(false);

  const [openTempBars, setOpenTempBars] = useState(false);

  const [openSteelLength, setOpenSteelLength] = useState(false);

  const thicknessItems: Item<string>[] = [
    { label: '0.10', value: '0.10' },
    { label: '0.110', value: '0.110' },
    { label: '0.120', value: '0.120' },
    { label: '0.125', value: '0.125' },
    { label: '0.150', value: '0.150' },
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

  const effectiveThickness =
    slabThicknessMode === 'custom'
      ? parseFloat(slabThickness)
      : slabThicknessMode
        ? parseFloat(slabThicknessMode)
        : 0;

  const volume = useMemo(() => {
    const w = parseFloat(width || '0');
    const l = parseFloat(length || '0');
    const t = effectiveThickness;
    const s = parseFloat(sets || '0');

    if (!w || !l || !t || !s) {
      return 0;
    }

    return w * l * t * s;
  }, [width, length, effectiveThickness, sets]);

  const generalMRatio = useMemo(() => {
    const w = parseFloat(width || '0');
    const l = parseFloat(length || '0');

    if (!w || !l) {
      return 0;
    }

    return Number((w / l).toFixed(2));
  }, [width, length]);

  const w4TempBars = useMemo(() => {
    const w = parseFloat(width || '0');

    return w > 0 ? (w / 4).toFixed(2) : '0.00';
  }, [width]);

  const l4TempBars = useMemo(() => {
    const l = parseFloat(length || '0');

    return l > 0 ? (l / 4).toFixed(2) : '0.00';
  }, [length]);

  const w3ExtraBars = useMemo(() => {
    const w = parseFloat(width || '0');

    return w > 0 ? (w / 3).toFixed(2) : '0.00';
  }, [width]);

  const l3ExtraBars = useMemo(() => {
    const l = parseFloat(length || '0');

    return l > 0 ? (l / 3).toFixed(2) : '0.00';
  }, [length]);

  const l2BentBarsToW = useMemo(() => {
    const l = parseFloat(length || '0');

    return l > 0 ? (l / 2).toFixed(2) : '0.00';
  }, [length]);

  const l2BentBarsToL = useMemo(() => {
    const w = parseFloat(width || '0');

    return w > 0 ? (w / 2).toFixed(2) : '0.00';
  }, [width]);

  const widthValue = parseFloat(width || '0');

  const lengthValue = parseFloat(length || '0');

  const spacingWidthValue =
    spacingWidthMode === 'custom'
      ? parseFloat(spacingWidth || '0')
      : parseFloat(spacingWidthMode || '0');

  const spacingLengthValue =
    spacingLengthMode === 'custom'
      ? parseFloat(spacingLength || '0')
      : parseFloat(spacingLengthMode || '0');

  const oneWay =
    !widthValue || !lengthValue
      ? ''
      : lengthValue / widthValue >= 2
        ? 'one way'
        : 'two way';

  const l2BentBarsToLValue = lengthValue > 0 ? lengthValue / 2 : 0;

  const l2BentBarsToWValue = widthValue > 0 ? widthValue / 2 : 0;

  const bentBarsAlongShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round((lengthValue / spacingLengthValue + 1) / 2)
        : Math.round(l2BentBarsToLValue / spacingLengthValue + 1);

  const bentBarsAlongLongSpanCutBarPcs = isNaN(
    l2BentBarsToWValue / spacingWidthValue,
  )
    ? ''
    : !oneWay || !spacingWidthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round(l2BentBarsToWValue / spacingWidthValue + 1);

  const mainBarsValue =
    mainBarsMode === 'custom'
      ? parseFloat(mainBars || '0')
      : parseFloat(mainBarsMode || '0');

  const bentBarsAlongShortSpanCutSize =
    !oneWay || !widthValue || !mainBarsValue
      ? ''
      : Number(
          (
            widthValue +
            2 * 16 * (mainBarsValue / 1000) +
            2 * (0.42 * (effectiveThickness - 0.04 - mainBarsValue / 1000))
          ).toFixed(2),
        );
  //
  const steelLengthValue =
    steelLengthMode === 'custom'
      ? parseFloat(steelLength || '0')
      : parseFloat(steelLengthMode || '0');

  const bentBarsAlongShortSpanWastageBar =
    !steelLengthValue || !bentBarsAlongShortSpanCutSize
      ? ''
      : steelLengthValue / bentBarsAlongShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(bentBarsAlongShortSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              bentBarsAlongShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / bentBarsAlongShortSpanCutSize) *
                bentBarsAlongShortSpanCutSize
            ).toFixed(2),
          );

  const bentBarsAlongLongSpanCutSize =
    !oneWay || !lengthValue || !mainBarsValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number(
            (
              lengthValue +
              2 * 16 * (mainBarsValue / 1000) +
              2 * (0.42 * (effectiveThickness - 0.04 - mainBarsValue / 1000))
            ).toFixed(2),
          );
  const bentBarsAlongLongSpanWastageBar =
    !steelLengthValue || !bentBarsAlongLongSpanCutSize
      ? ''
      : steelLengthValue / bentBarsAlongLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(bentBarsAlongLongSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              bentBarsAlongLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / bentBarsAlongLongSpanCutSize) *
                bentBarsAlongLongSpanCutSize
            ).toFixed(2),
          );

  //
  const straightBottomBarsShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round((lengthValue / spacingLengthValue + 1) / 2)
        : Math.round(lengthValue / spacingLengthValue + 1);
  const straightBottomBarsShortSpanCutSize =
    !oneWay || !widthValue || !mainBarsValue
      ? ''
      : Number((widthValue + 2 * 16 * (mainBarsValue / 1000)).toFixed(2));
  const straightBottomBarsShortSpanWastageBar =
    !steelLengthValue || !straightBottomBarsShortSpanCutSize
      ? ''
      : steelLengthValue / straightBottomBarsShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                straightBottomBarsShortSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              straightBottomBarsShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(
                steelLengthValue / straightBottomBarsShortSpanCutSize,
              ) *
                straightBottomBarsShortSpanCutSize
            ).toFixed(2),
          );
  const straightBottomBarsLongSpanCutBarPcs = isNaN(
    widthValue / spacingWidthValue,
  )
    ? ''
    : !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round(widthValue / spacingWidthValue + 1);
  const straightBottomBarsLongSpanCutSize =
    !oneWay || !lengthValue || !mainBarsValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number((lengthValue + 2 * 16 * (mainBarsValue / 1000)).toFixed(2));
  const straightBottomBarsLongSpanWastageBar =
    !steelLengthValue || !straightBottomBarsLongSpanCutSize
      ? ''
      : steelLengthValue / straightBottomBarsLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                straightBottomBarsLongSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              straightBottomBarsLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / straightBottomBarsLongSpanCutSize) *
                straightBottomBarsLongSpanCutSize
            ).toFixed(2),
          );
  const topCutBarsAlongShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round(lengthValue / spacingLengthValue + 1)
        : Math.round((l2BentBarsToLValue / spacingLengthValue + 1 - 1) * 2);
  const topCutBarsAlongShortSpanCutSize =
    !oneWay || !w3ExtraBars || !mainBarsValue
      ? ''
      : Number(
          (parseFloat(w3ExtraBars) + 16 * (mainBarsValue / 1000)).toFixed(2),
        );
  const topCutBarsAlongShortSpanWastageBar =
    !steelLengthValue || !topCutBarsAlongShortSpanCutSize
      ? ''
      : steelLengthValue / topCutBarsAlongShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                topCutBarsAlongShortSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              topCutBarsAlongShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / topCutBarsAlongShortSpanCutSize) *
                topCutBarsAlongShortSpanCutSize
            ).toFixed(2),
          );
  const topCutBarsAlongLongSpanCutBarPcs = isNaN(
    l2BentBarsToWValue / spacingWidthValue,
  )
    ? ''
    : !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round((l2BentBarsToWValue / spacingWidthValue + 1 - 1) * 2);
  const topCutBarsAlongLongSpanCutSize =
    !oneWay || !lengthValue || !mainBarsValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number(
            (parseFloat(l3ExtraBars) + 16 * (mainBarsValue / 1000)).toFixed(2),
          );
  const topCutBarsAlongLongSpanWastageBar =
    !steelLengthValue || !topCutBarsAlongLongSpanCutSize
      ? ''
      : steelLengthValue / topCutBarsAlongLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(
                topCutBarsAlongLongSpanCutSize / steelLengthValue + 1,
              ) *
                steelLengthValue -
              topCutBarsAlongLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / topCutBarsAlongLongSpanCutSize) *
                topCutBarsAlongLongSpanCutSize
            ).toFixed(2),
          );
  const tempBarsValue =
    tempBarsMode === 'custom'
      ? parseFloat(tempBars || '0')
      : parseFloat(tempBarsMode || '0');
  const tempBarsAlongShortSpanCutBarPcs =
    !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? ''
        : Math.round(parseFloat(l4TempBars) / spacingLengthValue + 1) * 2;
  const tempBarsAlongShortSpanCutSize =
    !oneWay || !tempBarsMode
      ? ''
      : oneWay === 'one way'
        ? ''
        : Number((widthValue + 2 * 16 * (tempBarsValue / 1000)).toFixed(2));
  const tempBarsAlongShortSpanWastageBar =
    !steelLengthValue || !tempBarsAlongShortSpanCutSize
      ? ''
      : steelLengthValue / tempBarsAlongShortSpanCutSize < 1
        ? Number(
            (
              Math.trunc(tempBarsAlongShortSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              tempBarsAlongShortSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / tempBarsAlongShortSpanCutSize) *
                tempBarsAlongShortSpanCutSize
            ).toFixed(2),
          );
  const tempBarsAlongLongSpanCutBarPcs = isNaN(widthValue / spacingWidthValue)
    ? ''
    : !oneWay || !spacingLengthValue
      ? ''
      : oneWay === 'one way'
        ? Math.round(widthValue / spacingWidthValue + 1) +
          Math.round(parseFloat(w4TempBars) / spacingWidthValue + 1) * 2
        : Math.round(parseFloat(w4TempBars) / spacingWidthValue + 1) * 2;
  const tempBarsAlongLongSpanCutSize =
    !oneWay || !tempBarsValue
      ? ''
      : Number((lengthValue + 2 * 16 * (tempBarsValue / 1000)).toFixed(2));
  const tempBarsAlongLongSpanWastageBar =
    !steelLengthValue || !tempBarsAlongLongSpanCutSize
      ? ''
      : steelLengthValue / tempBarsAlongLongSpanCutSize < 1
        ? Number(
            (
              Math.trunc(tempBarsAlongLongSpanCutSize / steelLengthValue + 1) *
                steelLengthValue -
              tempBarsAlongLongSpanCutSize -
              0.6
            ).toFixed(2),
          )
        : Number(
            (
              steelLengthValue -
              Math.trunc(steelLengthValue / tempBarsAlongLongSpanCutSize) *
                tempBarsAlongLongSpanCutSize
            ).toFixed(2),
          );
  //
  const reset = () => {
    setWidth('');
    setLength('');
    setSlabThickness('');
    setSets('');

    setSpacingWidth('');
    setSpacingLength('');

    setMainBars('');
    setTempBars('');

    setSteelLength('');

    setSlabThicknessMode(null);

    setSpacingWidthMode(null);
    setSpacingLengthMode(null);

    setMainBarsMode(null);
    setTempBarsMode(null);

    setSteelLengthMode(null);
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
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
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
              <Ionicons name="remove-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Suspended Slab</Text>

            <Text style={styles.subtitle}>Suspended slab estimator</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Width (m)</Text>

            <TextInput
              value={width}
              onChangeText={setWidth}
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="Enter value"
            />

            <Text style={styles.label}>Length (m)</Text>

            <TextInput
              value={length}
              onChangeText={setLength}
              style={styles.input}
              keyboardType="decimal-pad"
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
                  placeholder="Select thickness"
                />
              </View>
            )}

            <Text style={styles.label}># of Sets</Text>

            <TextInput
              value={sets}
              onChangeText={setSets}
              style={styles.input}
              keyboardType="decimal-pad"
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
                  placeholder="Select spacing"
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
                  placeholder="Select spacing"
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
                  placeholder="Select main bars"
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
                  placeholder="Select temp bars"
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
                  placeholder="Select steel length"
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result label="Volume" value={`${volume.toFixed(3)} cu.m`} />

            <Result label="General mRatio" value={`${generalMRatio}`} />

            <Result label="W/4 (for temp bars)" value={`${w4TempBars} m`} />

            <Result label="L/4 (for temp bars)" value={`${l4TempBars} m`} />

            <Result label="W/3 (for extra bars)" value={`${w3ExtraBars} m`} />

            <Result label="L/3 (for extra bars)" value={`${l3ExtraBars} m`} />

            <Result
              label="L/2 (for bent bars) “//” to W"
              value={`${l2BentBarsToW} m`}
            />

            <Result
              label="L/2 (for bent bars) “//” to L"
              value={`${l2BentBarsToL} m`}
            />

            <View style={styles.resultSection}>
              <Text style={styles.resultSectionTitle}>Computed Quantity</Text>

              <Result
                label="Bent Bars Along Short Span (cut bar pcs)"
                value={
                  bentBarsAlongShortSpanCutBarPcs === ''
                    ? '-'
                    : `${bentBarsAlongShortSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Bent Bars Along Short Span (cut size)"
                value={
                  bentBarsAlongShortSpanCutSize === ''
                    ? '-'
                    : `${bentBarsAlongShortSpanCutSize}`
                }
              />

              <Result
                label="Bent Bars Along Short Span (wastage/bar)"
                value={
                  bentBarsAlongShortSpanWastageBar === ''
                    ? '-'
                    : `${bentBarsAlongShortSpanWastageBar}`
                }
              />

              <Result
                label="Bent Bars Along Long Span (cut bar pcs)"
                value={
                  bentBarsAlongLongSpanCutBarPcs === ''
                    ? '-'
                    : `${bentBarsAlongLongSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Bent Bars Along Long Span (cut size)"
                value={
                  bentBarsAlongLongSpanCutSize === ''
                    ? '-'
                    : `${bentBarsAlongLongSpanCutSize}`
                }
              />

              <Result
                label="Bent Bars Along Long Span (wastage/bar)"
                value={
                  bentBarsAlongLongSpanWastageBar === ''
                    ? '-'
                    : `${bentBarsAlongLongSpanWastageBar}`
                }
              />

              <Result
                label="Straight Bottom Bars Short Span (cut bar pcs)"
                value={
                  straightBottomBarsShortSpanCutBarPcs === ''
                    ? '-'
                    : `${straightBottomBarsShortSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Straight Bottom Bars Short Span (cut size)"
                value={
                  straightBottomBarsShortSpanCutSize === ''
                    ? '-'
                    : `${straightBottomBarsShortSpanCutSize}`
                }
              />

              <Result
                label="Straight Bottom Bars Short Span (wastage/bar)"
                value={
                  straightBottomBarsShortSpanWastageBar === ''
                    ? '-'
                    : `${straightBottomBarsShortSpanWastageBar}`
                }
              />

              <Result
                label="Straight Bottom Bars Long Span (cut bar pcs)"
                value={
                  straightBottomBarsLongSpanCutBarPcs === ''
                    ? '-'
                    : `${straightBottomBarsLongSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Straight Bottom Bars Long Span (cut size)"
                value={
                  straightBottomBarsLongSpanCutSize === ''
                    ? '-'
                    : `${straightBottomBarsLongSpanCutSize}`
                }
              />

              <Result
                label="Straight Bottom Bars Long Span (wastage/bar)"
                value={
                  straightBottomBarsLongSpanWastageBar === ''
                    ? '-'
                    : `${straightBottomBarsLongSpanWastageBar}`
                }
              />

              <Result
                label="Top Cut Bars Along Short Span (cut bar pcs)"
                value={
                  topCutBarsAlongShortSpanCutBarPcs === ''
                    ? '-'
                    : `${topCutBarsAlongShortSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Top Cut Bars Along Short Span (cut size)"
                value={
                  topCutBarsAlongShortSpanCutSize === ''
                    ? '-'
                    : `${topCutBarsAlongShortSpanCutSize}`
                }
              />

              <Result
                label="Top Cut Bars Along Short Span (wastage/bar)"
                value={
                  topCutBarsAlongShortSpanWastageBar === ''
                    ? '-'
                    : `${topCutBarsAlongShortSpanWastageBar}`
                }
              />

              <Result
                label="Top Cut Bars Along Long Span (cut bar pcs)"
                value={
                  topCutBarsAlongLongSpanCutBarPcs === ''
                    ? '-'
                    : `${topCutBarsAlongLongSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Top Cut Bars Along Long Span (cut size)"
                value={
                  topCutBarsAlongLongSpanCutSize === ''
                    ? '-'
                    : `${topCutBarsAlongLongSpanCutSize}`
                }
              />

              <Result
                label="Top Cut Bars Along Long Span (wastage/bar)"
                value={
                  topCutBarsAlongLongSpanWastageBar === ''
                    ? '-'
                    : `${topCutBarsAlongLongSpanWastageBar}`
                }
              />

              <Result
                label="Temp Bars Along Short Span (cut bar pcs)"
                value={
                  tempBarsAlongShortSpanCutBarPcs === ''
                    ? '-'
                    : `${tempBarsAlongShortSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Temp Bars Along Short Span (cut size)"
                value={
                  tempBarsAlongShortSpanCutSize === ''
                    ? '-'
                    : `${tempBarsAlongShortSpanCutSize}`
                }
              />

              <Result
                label="Temp Bars Along Short Span (wastage/bar)"
                value={
                  tempBarsAlongShortSpanWastageBar === ''
                    ? '-'
                    : `${tempBarsAlongShortSpanWastageBar}`
                }
              />

              <Result
                label="Temp Bars Along Long Span (cut bar pcs)"
                value={
                  tempBarsAlongLongSpanCutBarPcs === ''
                    ? '-'
                    : `${tempBarsAlongLongSpanCutBarPcs} pcs`
                }
              />

              <Result
                label="Temp Bars Along Long Span (cut size)"
                value={
                  tempBarsAlongLongSpanCutSize === ''
                    ? '-'
                    : `${tempBarsAlongLongSpanCutSize}`
                }
              />

              <Result
                label="Temp Bars Along Long Span (wastage/bar)"
                value={
                  tempBarsAlongLongSpanWastageBar === ''
                    ? '-'
                    : `${tempBarsAlongLongSpanWastageBar}`
                }
              />
            </View>
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

  androidInput: {
    justifyContent: 'center',
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
  },

  modalCancel: {
    textAlign: 'center',
    marginTop: 12,
    color: '#ef4444',
    fontWeight: '600',
  },
  resultSection: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },

  resultSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 10,
  },
});
