import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
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

export default function WallFooting() {
  const insets = useSafeAreaInsets();

  const [sets, setSets] = useState('');

  const [width, setWidth] = useState<string | 'custom' | null>(null);
  const [customWidth, setCustomWidth] = useState('');
  const [openWidth, setOpenWidth] = useState(false);

  const [length, setLength] = useState('');

  const [thickness, setThickness] = useState<string | 'custom' | null>(null);
  const [customThickness, setCustomThickness] = useState('');
  const [openThickness, setOpenThickness] = useState(false);

  const [mix, setMix] = useState<MixType | 'custom' | null>(null);
  const [customMix, setCustomMix] = useState('');
  const [openMix, setOpenMix] = useState(false);

  const widthItems = [
    { label: '0.30', value: '0.30' },
    { label: '0.35', value: '0.35' },
    { label: '0.40', value: '0.40' },
    { label: '0.50', value: '0.50' },
    { label: '0.60', value: '0.60' },
    { label: 'Custom', value: 'custom' },
  ];

  const thicknessItems = [
    { label: '0.10', value: '0.10' },
    { label: '0.15', value: '0.15' },
    { label: '0.20', value: '0.20' },
    { label: '0.25', value: '0.25' },
    { label: '0.30', value: '0.30' },
    { label: 'Custom', value: 'custom' },
  ];

  const mixItems = [
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

  const effectiveMix =
    mix === 'custom' ? (customMix ? parseFloat(customMix) : '') : mix || '';

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
  }, [effectiveWidth, numericLength, effectiveThickness]);

  const totalVolume = useMemo(() => {
    if (!volume || isNaN(numericSets)) return 0;
    return volume * numericSets;
  }, [volume, numericSets]);

  const cement = useMemo(() => {
    if (!totalVolume || !effectiveMix) return '0.00';
    return computeWallFootingCement(totalVolume, effectiveMix);
  }, [totalVolume, effectiveMix]);

  const sand = useMemo(() => {
    if (!totalVolume || !effectiveMix) return '0.00';
    return computeWallFootingSand(totalVolume, effectiveMix);
  }, [totalVolume, effectiveMix]);

  const gravel = useMemo(() => {
    if (!totalVolume || !effectiveMix) return '0.00';
    return computeWallFootingGravel(totalVolume, effectiveMix);
  }, [totalVolume, effectiveMix]);

  const reset = () => {
    setSets('');
    setWidth(null);
    setCustomWidth('');
    setLength('');
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
          title: 'Wall Footing',
          headerTransparent: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="square-outline" size={28} color="#0F172A" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>No. of Sets</Text>
            <TextInput
              value={sets}
              onChangeText={setSets}
              keyboardType="numeric"
              style={styles.input}
            />

            {/* WIDTH */}
            <Text style={styles.label}>Width</Text>
            {width === 'custom' ? (
              <TextInput
                value={customWidth}
                onChangeText={setCustomWidth}
                keyboardType="numeric"
                style={styles.input}
              />
            ) : (
              <View style={dropdownStyle(openWidth)}>
                <DropDownPicker
                  open={openWidth}
                  value={width}
                  items={widthItems}
                  setOpen={(val) =>
                    handleOpen(val, setOpenWidth, [
                      setOpenThickness,
                      setOpenMix,
                    ])
                  }
                  setValue={setWidth}
                  listMode={getListMode()}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <Text style={styles.label}>Length</Text>
            <TextInput
              value={length}
              onChangeText={setLength}
              keyboardType="numeric"
              style={styles.input}
            />

            {/* THICKNESS */}
            <Text style={styles.label}>Thickness</Text>
            {thickness === 'custom' ? (
              <TextInput
                value={customThickness}
                onChangeText={setCustomThickness}
                keyboardType="numeric"
                style={styles.input}
              />
            ) : (
              <View style={dropdownStyle(openThickness)}>
                <DropDownPicker
                  open={openThickness}
                  value={thickness}
                  items={thicknessItems}
                  setOpen={(val) =>
                    handleOpen(val, setOpenThickness, [
                      setOpenWidth,
                      setOpenMix,
                    ])
                  }
                  setValue={setThickness}
                  listMode={getListMode()}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            {/* MIX */}
            <Text style={styles.label}>Mixture</Text>
            {mix === 'custom' ? (
              <TextInput
                value={customMix}
                onChangeText={setCustomMix}
                keyboardType="numeric"
                style={styles.input}
              />
            ) : (
              <View style={dropdownStyle(openMix)}>
                <DropDownPicker
                  open={openMix}
                  value={mix}
                  items={mixItems}
                  setOpen={(val) =>
                    handleOpen(val, setOpenMix, [
                      setOpenWidth,
                      setOpenThickness,
                    ])
                  }
                  setValue={setMix}
                  listMode={getListMode()}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Result label="Volume (1 pc)" value={`${volume.toFixed(3)} m³`} />
            <Result label="Cement" value={`${cement} bags`} />
            <Result label="Sand" value={`${sand} m³`} />
            <Result label="Gravel" value={`${gravel} m³`} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* 🔥 shared helpers */
function getListMode() {
  return Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW';
}

function dropdownStyle(open: boolean) {
  return {
    zIndex: open ? 3000 : 1,
    ...(Platform.OS === 'android' && {
      elevation: open ? 3000 : 0,
    }),
  };
}

function handleOpen(val: any, setter: any, others: any[]) {
  setter((prev: boolean) => {
    const next = typeof val === 'function' ? val(prev) : val;
    if (next) others.forEach((fn) => fn(false));
    return next;
  });
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
  header: { alignItems: 'center', marginBottom: 32 },

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

  label: { marginTop: 10, marginBottom: 6, color: '#64748B' },

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
    borderColor: '#E2E8F0', // no elevation
  },

  reset: {
    marginTop: 16,
    backgroundColor: '#475569',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  resetText: { color: '#fff', fontWeight: '600' },

  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  resultLabel: { color: '#64748B' },
  resultValue: { fontWeight: '600' },
});
