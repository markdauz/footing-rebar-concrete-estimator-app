import { getSuspendedSlabComputations } from '@/utils/suspendedSlabCalculator';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useState } from 'react';
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

  const [barDescription, setBarDescription] = useState<string | null>(null);

  const [openBarDescription, setOpenBarDescription] = useState(false);

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

  const barDescriptionItems: Item<string>[] = [
    {
      label: 'Bent Bars Along Short Span',
      value: 'bentShort',
    },
    {
      label: 'Bent Bars Along Long Span',
      value: 'bentLong',
    },
    {
      label: 'Straight Bottom Bars (Short Span)',
      value: 'straightShort',
    },
    {
      label: 'Straight Bottom Bars (Long Span)',
      value: 'straightLong',
    },
    {
      label: 'Top Cut Bars Along Short Span',
      value: 'topShort',
    },
    {
      label: 'Top Cut Bars Along Long Span',
      value: 'topLong',
    },
    {
      label: 'Temp Bars Along Short Span',
      value: 'tempShort',
    },
    {
      label: 'Temp Bars Along Long Span',
      value: 'tempLong',
    },
  ];

  const computations = getSuspendedSlabComputations({
    width,
    length,
    slabThickness,
    sets,
    spacingWidth,
    spacingLength,
    mainBars,
    tempBars,
    steelLength,
    slabThicknessMode,
    spacingWidthMode,
    spacingLengthMode,
    mainBarsMode,
    tempBarsMode,
    steelLengthMode,
  });

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
    setBarDescription(null);
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

  const selectedSteelLength = steelLengthMode || steelLength;

  const showSteelLength = (length: number) => {
    if (!selectedSteelLength || selectedSteelLength === 'custom') {
      return true;
    }

    return Number(selectedSteelLength) === length;
  };

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

            <Text style={styles.subtitle}>
              Suspended Slab (20mm concrete cover)
            </Text>
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

            <Text style={styles.label}>Bar Description</Text>

            {isAndroid ? (
              <>
                <TouchableOpacity
                  style={[styles.input, styles.androidInput]}
                  onPress={() => setOpenBarDescription(true)}
                >
                  <Text>
                    {barDescription
                      ? barDescriptionItems.find(
                          (i) => i.value === barDescription,
                        )?.label
                      : 'Select bar description'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openBarDescription,
                  setOpenBarDescription,
                  barDescriptionItems,
                  (val) => {
                    setBarDescription(val);
                  },
                )}
              </>
            ) : (
              <View style={{ zIndex: 900 }}>
                <DropDownPicker
                  open={openBarDescription}
                  value={barDescription}
                  items={barDescriptionItems}
                  setOpen={setOpenBarDescription}
                  setValue={setBarDescription}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                  dropDownDirection="BOTTOM"
                  placeholder="Select bar description"
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result
              label="Volume"
              value={`${computations.volume.toFixed(3)} cu.m`}
            />

            <Result
              label="Type"
              value={computations.slabType === '' ? '-' : computations.slabType}
            />

            <Result
              label="General mRatio"
              value={`${computations.generalMRatio}`}
            />

            <Result
              label="Steel Kgs/cu.m"
              value={`${Number(computations.steelKgsPerCum || 0).toFixed(
                2,
              )} kg`}
            />

            <Result
              label="W/4 (for temp bars)"
              value={`${computations.w4TempBars} m`}
            />

            <Result
              label="L/4 (for temp bars)"
              value={`${computations.l4TempBars} m`}
            />

            <Result
              label="W/3 (for extra bars)"
              value={`${computations.w3ExtraBars} m`}
            />

            <Result
              label="L/3 (for extra bars)"
              value={`${computations.l3ExtraBars} m`}
            />

            <Result
              label="L/2 (for bent bars) “//” to W"
              value={`${computations.l2BentBarsToW} m`}
            />

            <Result
              label="L/2 (for bent bars) “//” to L"
              value={`${computations.l2BentBarsToL} m`}
            />

            <View style={styles.resultSection}>
              <Text style={styles.resultSectionTitle}>Computed Quantity</Text>

              {barDescription === 'bentShort' && (
                <>
                  <Result
                    label="Bent Bars Along Short Span (cut bar pcs)"
                    value={
                      computations.bentBarsAlongShortSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Bent Bars Along Short Span (cut size)"
                    value={
                      computations.bentBarsAlongShortSpanCutSize === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpanCutSize}`
                    }
                  />

                  <Result
                    label="Bent Bars Along Short Span (wastage/bar)"
                    value={
                      computations.bentBarsAlongShortSpanWastageBar === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpanWastageBar}`
                    }
                  />
                </>
              )}

              {barDescription === 'bentLong' && (
                <>
                  <Result
                    label="Bent Bars Along Long Span (cut bar pcs)"
                    value={
                      computations.bentBarsAlongLongSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Bent Bars Along Long Span (cut size)"
                    value={
                      computations.bentBarsAlongLongSpanCutSize === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpanCutSize}`
                    }
                  />

                  <Result
                    label="Bent Bars Along Long Span (wastage/bar)"
                    value={
                      computations.bentBarsAlongLongSpanWastageBar === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpanWastageBar}`
                    }
                  />
                </>
              )}

              {barDescription === 'straightShort' && (
                <>
                  <Result
                    label="Straight Bottom Bars Short Span (cut bar pcs)"
                    value={
                      computations.straightBottomBarsShortSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Straight Bottom Bars Short Span (cut size)"
                    value={
                      computations.straightBottomBarsShortSpanCutSize === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpanCutSize}`
                    }
                  />

                  <Result
                    label="Straight Bottom Bars Short Span (wastage/bar)"
                    value={
                      computations.straightBottomBarsShortSpanWastageBar === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpanWastageBar}`
                    }
                  />
                </>
              )}

              {barDescription === 'straightLong' && (
                <>
                  <Result
                    label="Straight Bottom Bars Long Span (cut bar pcs)"
                    value={
                      computations.straightBottomBarsLongSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Straight Bottom Bars Long Span (cut size)"
                    value={
                      computations.straightBottomBarsLongSpanCutSize === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpanCutSize}`
                    }
                  />

                  <Result
                    label="Straight Bottom Bars Long Span (wastage/bar)"
                    value={
                      computations.straightBottomBarsLongSpanWastageBar === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpanWastageBar}`
                    }
                  />
                </>
              )}

              {barDescription === 'topShort' && (
                <>
                  <Result
                    label="Top Cut Bars Along Short Span (cut bar pcs)"
                    value={
                      computations.topCutBarsAlongShortSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Top Cut Bars Along Short Span (cut size)"
                    value={
                      computations.topCutBarsAlongShortSpanCutSize === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpanCutSize}`
                    }
                  />

                  <Result
                    label="Top Cut Bars Along Short Span (wastage/bar)"
                    value={
                      computations.topCutBarsAlongShortSpanWastageBar === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpanWastageBar}`
                    }
                  />
                </>
              )}

              {barDescription === 'topLong' && (
                <>
                  <Result
                    label="Top Cut Bars Along Long Span (cut bar pcs)"
                    value={
                      computations.topCutBarsAlongLongSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Top Cut Bars Along Long Span (cut size)"
                    value={
                      computations.topCutBarsAlongLongSpanCutSize === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpanCutSize}`
                    }
                  />

                  <Result
                    label="Top Cut Bars Along Long Span (wastage/bar)"
                    value={
                      computations.topCutBarsAlongLongSpanWastageBar === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpanWastageBar}`
                    }
                  />
                </>
              )}

              {barDescription === 'tempShort' && (
                <>
                  <Result
                    label="Temp Bars Along Short Span (cut bar pcs)"
                    value={
                      computations.tempBarsAlongShortSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Temp Bars Along Short Span (cut size)"
                    value={
                      computations.tempBarsAlongShortSpanCutSize === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpanCutSize}`
                    }
                  />

                  <Result
                    label="Temp Bars Along Short Span (wastage/bar)"
                    value={
                      computations.tempBarsAlongShortSpanWastageBar === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpanWastageBar}`
                    }
                  />
                </>
              )}

              {barDescription === 'tempLong' && (
                <>
                  <Result
                    label="Temp Bars Along Long Span (cut bar pcs)"
                    value={
                      computations.tempBarsAlongLongSpanCutBarPcs === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpanCutBarPcs} pcs`
                    }
                  />

                  <Result
                    label="Temp Bars Along Long Span (cut size)"
                    value={
                      computations.tempBarsAlongLongSpanCutSize === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpanCutSize}`
                    }
                  />

                  <Result
                    label="Temp Bars Along Long Span (wastage/bar)"
                    value={
                      computations.tempBarsAlongLongSpanWastageBar === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpanWastageBar}`
                    }
                  />
                </>
              )}
            </View>
          </View>
          {/*  */}
          <View style={[styles.resultCard, { marginTop: 18 }]}>
            <Text style={styles.resultTitle}>Total Pcs of Bars</Text>

            <Result
              label="A. Main Bars Pcs"
              value={`${computations.mainBarsPcs} pcs`}
            />

            <Result
              label="A. Main Bars Length"
              value={
                computations.mainBarsLength === ''
                  ? '-'
                  : computations.mainBarsLength
              }
            />

            <Result
              label="A. Main Bars Kgs"
              value={`${computations.mainBarsKgs} kg`}
            />

            <View style={styles.resultSection}>
              <Result
                label="B. Temp Bars Pcs"
                value={`${computations.tempBarsPcs} pcs`}
              />

              <Result
                label="B. Temp Bars Length"
                value={
                  computations.tempBarsLength === ''
                    ? '-'
                    : computations.tempBarsLength
                }
              />

              <Result
                label="B. Temp Bars Kgs"
                value={`${computations.tempBarsKgs} kg`}
              />
            </View>

            <View style={styles.resultSection}>
              <Result
                label="Total #16 G.I Wire (kg)"
                value={`${Number(computations.totalGIWireKg || 0).toFixed(
                  2,
                )} kg`}
              />
            </View>
          </View>
          {/*  */}
          <View style={[styles.resultCard, { marginTop: 18 }]}>
            <Text style={styles.resultTitle}>
              Overview Wastage from Different Steel Length
            </Text>

            {/* Bent Bars Along Short Span */}
            {barDescription === 'bentShort' && (
              <>
                <Result
                  label="Bent Bars Along Short Span (# pcs from length/# of bars)"
                  value={
                    computations.bentBarsAlongShortSpanPcsFromLengthBars === ''
                      ? '-'
                      : `${computations.bentBarsAlongShortSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Bent Bars Along Short Span (remarks)"
                  value={
                    computations.bentBarsAlongShortSpanRemarks === ''
                      ? '-'
                      : computations.bentBarsAlongShortSpanRemarks
                  }
                />

                <Result
                  label="Bent Bars Along Short Span (total pcs of steel bar)"
                  value={
                    computations.bentBarsAlongShortSpanTotalPcsSteelBar === ''
                      ? '-'
                      : `${Number(
                          computations.bentBarsAlongShortSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Bent Bars Along Short Span (6m)"
                    value={
                      computations.bentBarsAlongShortSpan6m === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Bent Bars Along Short Span (7.5m)"
                    value={
                      computations.bentBarsAlongShortSpan75m === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Bent Bars Along Short Span (9m)"
                    value={
                      computations.bentBarsAlongShortSpan9m === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Bent Bars Along Short Span (10.5m)"
                    value={
                      computations.bentBarsAlongShortSpan105m === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Bent Bars Along Short Span (12m)"
                    value={
                      computations.bentBarsAlongShortSpan12m === ''
                        ? '-'
                        : `${computations.bentBarsAlongShortSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Bent Bars Along Short Span (minimum wastage)"
                  value={
                    computations.bentBarsAlongShortSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.bentBarsAlongShortSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}

            {/* Bent Bars Along Long Span */}
            {barDescription === 'bentLong' && (
              <>
                <Result
                  label="Bent Bars Along Long Span (# pcs from length/# of bars)"
                  value={
                    computations.bentBarsAlongLongSpanPcsFromLengthBars === ''
                      ? '-'
                      : `${computations.bentBarsAlongLongSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Bent Bars Along Long Span (remarks)"
                  value={
                    computations.bentBarsAlongLongSpanRemarks === ''
                      ? '-'
                      : computations.bentBarsAlongLongSpanRemarks
                  }
                />

                <Result
                  label="Bent Bars Along Long Span (total pcs of steel bar)"
                  value={
                    computations.bentBarsAlongLongSpanTotalPcsSteelBar === ''
                      ? '-'
                      : `${Number(
                          computations.bentBarsAlongLongSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Bent Bars Along Long Span (6m)"
                    value={
                      computations.bentBarsAlongLongSpan6m === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Bent Bars Along Long Span (7.5m)"
                    value={
                      computations.bentBarsAlongLongSpan75m === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Bent Bars Along Long Span (9m)"
                    value={
                      computations.bentBarsAlongLongSpan9m === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Bent Bars Along Long Span (10.5m)"
                    value={
                      computations.bentBarsAlongLongSpan105m === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Bent Bars Along Long Span (12m)"
                    value={
                      computations.bentBarsAlongLongSpan12m === ''
                        ? '-'
                        : `${computations.bentBarsAlongLongSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Bent Bars Along Long Span (minimum wastage)"
                  value={
                    computations.bentBarsAlongLongSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.bentBarsAlongLongSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}
            {/* Straight Bottom Bars (Short Span) */}
            {barDescription === 'straightShort' && (
              <>
                <Result
                  label="Straight Bottom Bars (Short Span) (# pcs from length/# of bars)"
                  value={
                    computations.straightBottomBarsShortSpanPcsFromLengthBars ===
                    ''
                      ? '-'
                      : `${computations.straightBottomBarsShortSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Straight Bottom Bars (Short Span) (remarks)"
                  value={
                    computations.straightBottomBarsShortSpanRemarks === ''
                      ? '-'
                      : computations.straightBottomBarsShortSpanRemarks
                  }
                />

                <Result
                  label="Straight Bottom Bars (Short Span) (total pcs of steel bar)"
                  value={
                    computations.straightBottomBarsShortSpanTotalPcsSteelBar ===
                    ''
                      ? '-'
                      : `${Number(
                          computations.straightBottomBarsShortSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Straight Bottom Bars (Short Span) (6m)"
                    value={
                      computations.straightBottomBarsShortSpan6m === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Straight Bottom Bars (Short Span) (7.5m)"
                    value={
                      computations.straightBottomBarsShortSpan75m === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Straight Bottom Bars (Short Span) (9m)"
                    value={
                      computations.straightBottomBarsShortSpan9m === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Straight Bottom Bars (Short Span) (10.5m)"
                    value={
                      computations.straightBottomBarsShortSpan105m === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Straight Bottom Bars (Short Span) (12m)"
                    value={
                      computations.straightBottomBarsShortSpan12m === ''
                        ? '-'
                        : `${computations.straightBottomBarsShortSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Straight Bottom Bars (Short Span) (minimum wastage)"
                  value={
                    computations.straightBottomBarsShortSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.straightBottomBarsShortSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}
            {/* Straight Bottom Bars (Long Span) */}
            {barDescription === 'straightLong' && (
              <>
                <Result
                  label="Straight Bottom Bars (Long Span) (# pcs from length/# of bars)"
                  value={
                    computations.straightBottomBarsLongSpanPcsFromLengthBars ===
                    ''
                      ? '-'
                      : `${computations.straightBottomBarsLongSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Straight Bottom Bars (Long Span) (remarks)"
                  value={
                    computations.straightBottomBarsLongSpanRemarks === ''
                      ? '-'
                      : computations.straightBottomBarsLongSpanRemarks
                  }
                />

                <Result
                  label="Straight Bottom Bars (Long Span) (total pcs of steel bar)"
                  value={
                    computations.straightBottomBarsLongSpanTotalPcsSteelBar ===
                    ''
                      ? '-'
                      : `${Number(
                          computations.straightBottomBarsLongSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Straight Bottom Bars (Long Span) (6m)"
                    value={
                      computations.straightBottomBarsLongSpan6m === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Straight Bottom Bars (Long Span) (7.5m)"
                    value={
                      computations.straightBottomBarsLongSpan75m === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Straight Bottom Bars (Long Span) (9m)"
                    value={
                      computations.straightBottomBarsLongSpan9m === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Straight Bottom Bars (Long Span) (10.5m)"
                    value={
                      computations.straightBottomBarsLongSpan105m === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Straight Bottom Bars (Long Span) (12m)"
                    value={
                      computations.straightBottomBarsLongSpan12m === ''
                        ? '-'
                        : `${computations.straightBottomBarsLongSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Straight Bottom Bars (Long Span) (minimum wastage)"
                  value={
                    computations.straightBottomBarsLongSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.straightBottomBarsLongSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}
            {/* Top Cut Bars Along Short Span */}
            {barDescription === 'topShort' && (
              <>
                <Result
                  label="Top Cut Bars Along Short Span (# pcs from length/# of bars)"
                  value={
                    computations.topCutBarsAlongShortSpanPcsFromLengthBars ===
                    ''
                      ? '-'
                      : `${computations.topCutBarsAlongShortSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Top Cut Bars Along Short Span (remarks)"
                  value={
                    computations.topCutBarsAlongShortSpanRemarks === ''
                      ? '-'
                      : computations.topCutBarsAlongShortSpanRemarks
                  }
                />

                <Result
                  label="Top Cut Bars Along Short Span (total pcs of steel bar)"
                  value={
                    computations.topCutBarsAlongShortSpanTotalPcsSteelBar === ''
                      ? '-'
                      : `${Number(
                          computations.topCutBarsAlongShortSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Top Cut Bars Along Short Span (6m)"
                    value={
                      computations.topCutBarsAlongShortSpan6m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Top Cut Bars Along Short Span (7.5m)"
                    value={
                      computations.topCutBarsAlongShortSpan75m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Top Cut Bars Along Short Span (9m)"
                    value={
                      computations.topCutBarsAlongShortSpan9m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Top Cut Bars Along Short Span (10.5m)"
                    value={
                      computations.topCutBarsAlongShortSpan105m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Top Cut Bars Along Short Span (12m)"
                    value={
                      computations.topCutBarsAlongShortSpan12m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongShortSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Top Cut Bars Along Short Span (minimum wastage)"
                  value={
                    computations.topCutBarsAlongShortSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.topCutBarsAlongShortSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}
            {/* Top Cut Bars Along Long Span */}
            {barDescription === 'topLong' && (
              <>
                <Result
                  label="Top Cut Bars Along Long Span (# pcs from length/# of bars)"
                  value={
                    computations.topCutBarsAlongLongSpanPcsFromLengthBars === ''
                      ? '-'
                      : `${computations.topCutBarsAlongLongSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Top Cut Bars Along Long Span (remarks)"
                  value={
                    computations.topCutBarsAlongLongSpanRemarks === ''
                      ? '-'
                      : computations.topCutBarsAlongLongSpanRemarks
                  }
                />

                <Result
                  label="Top Cut Bars Along Long Span (total pcs of steel bar)"
                  value={
                    computations.topCutBarsAlongLongSpanTotalPcsSteelBar === ''
                      ? '-'
                      : `${Number(
                          computations.topCutBarsAlongLongSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Top Cut Bars Along Long Span (6m)"
                    value={
                      computations.topCutBarsAlongLongSpan6m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Top Cut Bars Along Long Span (7.5m)"
                    value={
                      computations.topCutBarsAlongLongSpan75m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Top Cut Bars Along Long Span (9m)"
                    value={
                      computations.topCutBarsAlongLongSpan9m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Top Cut Bars Along Long Span (10.5m)"
                    value={
                      computations.topCutBarsAlongLongSpan105m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Top Cut Bars Along Long Span (12m)"
                    value={
                      computations.topCutBarsAlongLongSpan12m === ''
                        ? '-'
                        : `${computations.topCutBarsAlongLongSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Top Cut Bars Along Long Span (minimum wastage)"
                  value={
                    computations.topCutBarsAlongLongSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.topCutBarsAlongLongSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}
            {/* Temp Bars Along Short Span */}
            {barDescription === 'tempShort' && (
              <>
                <Result
                  label="Temp Bars Along Short Span (# pcs from length/# of bars)"
                  value={
                    computations.tempBarsAlongShortSpanPcsFromLengthBars === ''
                      ? '-'
                      : `${computations.tempBarsAlongShortSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Temp Bars Along Short Span (remarks)"
                  value={
                    computations.tempBarsAlongShortSpanRemarks === ''
                      ? '-'
                      : computations.tempBarsAlongShortSpanRemarks
                  }
                />

                <Result
                  label="Temp Bars Along Short Span (total pcs of steel bar)"
                  value={
                    computations.tempBarsAlongShortSpanTotalPcsSteelBar === ''
                      ? '-'
                      : `${Number(
                          computations.tempBarsAlongShortSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Temp Bars Along Short Span (6m)"
                    value={
                      computations.tempBarsAlongShortSpan6m === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Temp Bars Along Short Span (7.5m)"
                    value={
                      computations.tempBarsAlongShortSpan75m === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Temp Bars Along Short Span (9m)"
                    value={
                      computations.tempBarsAlongShortSpan9m === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Temp Bars Along Short Span (10.5m)"
                    value={
                      computations.tempBarsAlongShortSpan105m === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Temp Bars Along Short Span (12m)"
                    value={
                      computations.tempBarsAlongShortSpan12m === ''
                        ? '-'
                        : `${computations.tempBarsAlongShortSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Temp Bars Along Short Span (minimum wastage)"
                  value={
                    computations.tempBarsAlongShortSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.tempBarsAlongShortSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}
            {/* Temp Bars Along Long Span */}
            {barDescription === 'tempLong' && (
              <>
                <Result
                  label="Temp Bars Along Long Span (# pcs from length/# of bars)"
                  value={
                    computations.tempBarsAlongLongSpanPcsFromLengthBars === ''
                      ? '-'
                      : `${computations.tempBarsAlongLongSpanPcsFromLengthBars} pcs`
                  }
                />

                <Result
                  label="Temp Bars Along Long Span (remarks)"
                  value={
                    computations.tempBarsAlongLongSpanRemarks === ''
                      ? '-'
                      : computations.tempBarsAlongLongSpanRemarks
                  }
                />

                <Result
                  label="Temp Bars Along Long Span (total pcs of steel bar)"
                  value={
                    computations.tempBarsAlongLongSpanTotalPcsSteelBar === ''
                      ? '-'
                      : `${Number(
                          computations.tempBarsAlongLongSpanTotalPcsSteelBar,
                        ).toFixed(2)} pcs`
                  }
                />

                {showSteelLength(6) && (
                  <Result
                    label="Temp Bars Along Long Span (6m)"
                    value={
                      computations.tempBarsAlongLongSpan6m === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpan6m} m`
                    }
                  />
                )}

                {showSteelLength(7.5) && (
                  <Result
                    label="Temp Bars Along Long Span (7.5m)"
                    value={
                      computations.tempBarsAlongLongSpan75m === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpan75m} m`
                    }
                  />
                )}

                {showSteelLength(9) && (
                  <Result
                    label="Temp Bars Along Long Span (9m)"
                    value={
                      computations.tempBarsAlongLongSpan9m === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpan9m} m`
                    }
                  />
                )}

                {showSteelLength(10.5) && (
                  <Result
                    label="Temp Bars Along Long Span (10.5m)"
                    value={
                      computations.tempBarsAlongLongSpan105m === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpan105m} m`
                    }
                  />
                )}

                {showSteelLength(12) && (
                  <Result
                    label="Temp Bars Along Long Span (12m)"
                    value={
                      computations.tempBarsAlongLongSpan12m === ''
                        ? '-'
                        : `${computations.tempBarsAlongLongSpan12m} m`
                    }
                  />
                )}

                <Result
                  label="Temp Bars Along Long Span (minimum wastage)"
                  value={
                    computations.tempBarsAlongLongSpanMinimumWastage === 0
                      ? '-'
                      : `${computations.tempBarsAlongLongSpanMinimumWastage.toFixed(
                          2,
                        )} m`
                  }
                />
              </>
            )}
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
    alignItems: 'flex-start',
    paddingVertical: 8,
  },

  resultLabel: {
    color: '#94a3b8',
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: '80%',
    lineHeight: 18,
    paddingRight: 12,
  },

  resultValue: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 15,
    textAlign: 'right',
    maxWidth: '20%',
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
