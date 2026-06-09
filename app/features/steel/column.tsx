import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import InputField from '../../../components/InputField';
import {
  getKgsPerCuM,
  getL24,
  getL26,
  getL27,
  getLatTiesDiameter,
  getPcsLatTiesOptionA,
  getPcsLatTiesOptionBOne,
  getPcsLatTiesOptionBTwo,
  getRequiredSteelLength,
  getTieWiresOptionA,
  getTieWiresOptionBOne,
  getTieWiresOptionBTwo,
  getWaste,
  getWasteRemark,
} from '../../../utils/columnRebarCalculator';

export default function Column() {
  const insets = useSafeAreaInsets();

  const EMPTY_INPUT = {
    mainBarDiameter: '',
    tieBarDiameter: '',
    steelLength: '',
    numberOfColumns: '',
    columnWidth: '',
    columnLength: '',
    columnHeight: '',
    numberOfBarsA: '',
    numberOfBarsB: '',
    tiesSteelLength: '',
    latTiesDiameter: '',
  };

  const [input, setInput] = useState(EMPTY_INPUT);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setInput((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const volume = useMemo(() => {
    const width = parseFloat(input.columnWidth || '0');
    const length = parseFloat(input.columnLength || '0');
    const height = parseFloat(input.columnHeight || '0');
    const columns = parseFloat(input.numberOfColumns || '0');

    if (!width || !length || !height || !columns) {
      return '0.000';
    }

    return (width * length * height * columns).toFixed(3);
  }, [input]);

  useEffect(() => {
    const hasRequiredValues =
      input.mainBarDiameter &&
      input.tieBarDiameter &&
      input.steelLength &&
      input.numberOfColumns &&
      input.columnWidth &&
      input.columnLength &&
      input.columnHeight &&
      input.numberOfBarsA &&
      input.numberOfBarsB &&
      input.tiesSteelLength;

    if (!hasRequiredValues) {
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  //
  const latTiesDiameter = getLatTiesDiameter(input.mainBarDiameter);

  const pcsLatTiesOptionA = getPcsLatTiesOptionA({
    columnHeight: input.columnHeight,
    columnWidth: input.columnWidth,
    columnLength: input.columnLength,
    numberOfColumns: input.numberOfColumns,
  });

  const tieWiresOptionA = getTieWiresOptionA({
    pcsLatTiesOptionA,
    numberOfBarsA: input.numberOfBarsA,
    numberOfBarsB: input.numberOfBarsB,
  });
  const pcsLatTiesOptionBOne = getPcsLatTiesOptionBOne({
    columnHeight: input.columnHeight,
    columnWidth: input.columnWidth,
    columnLength: input.columnLength,
    numberOfColumns: input.numberOfColumns,
    mainBarDiameter: input.mainBarDiameter,
    latTiesDiameter,
  });
  const tieWiresOptionBOne = getTieWiresOptionBOne({
    pcsLatTiesOptionBOne,
    numberOfBarsA: input.numberOfBarsA,
    numberOfBarsB: input.numberOfBarsB,
  });
  const pcsLatTiesOptionBTwo = getPcsLatTiesOptionBTwo({
    columnHeight: input.columnHeight,
    columnWidth: input.columnWidth,
    columnLength: input.columnLength,
    numberOfColumns: input.numberOfColumns,
    mainBarDiameter: input.mainBarDiameter,
    tieBarDiameter: input.tieBarDiameter,
    latTiesDiameter,
  });
  const tieWiresOptionBTwo = getTieWiresOptionBTwo({
    pcsLatTiesOptionBTwo,
    numberOfBarsA: input.numberOfBarsA,
    numberOfBarsB: input.numberOfBarsB,
  });
  const requiredSteelLength = getRequiredSteelLength(
    input.columnHeight,
    input.mainBarDiameter,
  );
  const waste6m = getWaste(6, requiredSteelLength);

  const waste75m = getWaste(7.5, requiredSteelLength);

  const waste9m = getWaste(9, requiredSteelLength);

  const waste105m = getWaste(10.5, requiredSteelLength);

  const waste12m = getWaste(12, requiredSteelLength);

  const l24 = getL24(input.steelLength, requiredSteelLength);

  const l26 = getL26({
    numberOfBarsA: input.numberOfBarsA,
    numberOfColumns: input.numberOfColumns,
    steelLength: input.steelLength,
    requiredSteelLength,
    l24,
  });

  const l27 = getL27({
    l26,
    steelLength: input.steelLength,
    mainBarDiameter: input.mainBarDiameter,
  });

  const kgsPerCuM = getKgsPerCuM({
    l27,
    volume,
  });

  //

  const handleReset = () => {
    setInput(EMPTY_INPUT);
    setShowResults(false);
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
              <Ionicons name="cube-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Column Rebar Calculator</Text>

            <Text style={styles.subtitle}>Column Rebar Calculator</Text>
          </View>

          <View style={styles.card}>
            <InputField
              label="a. Main Bar Diameter Ø (mm)"
              value={input.mainBarDiameter}
              onChange={handleChange('mainBarDiameter')}
            />

            <InputField
              label="b. Main Bar Diameter Ø (mm)"
              value={input.tieBarDiameter}
              onChange={handleChange('tieBarDiameter')}
            />

            <InputField
              label="Steel Length (m)"
              value={input.steelLength}
              onChange={handleChange('steelLength')}
            />

            <InputField
              label="# of Columns (sets)"
              value={input.numberOfColumns}
              onChange={handleChange('numberOfColumns')}
            />

            <InputField
              label="Column Width (m)"
              value={input.columnWidth}
              onChange={handleChange('columnWidth')}
            />

            <InputField
              label="Column Length (m)"
              value={input.columnLength}
              onChange={handleChange('columnLength')}
            />

            <InputField
              label="Column Height (m)"
              value={input.columnHeight}
              onChange={handleChange('columnHeight')}
            />

            <InputField
              label="# of Bars (a)"
              value={input.numberOfBarsA}
              onChange={handleChange('numberOfBarsA')}
            />

            <InputField
              label="# of Bars (b)"
              value={input.numberOfBarsB}
              onChange={handleChange('numberOfBarsB')}
            />

            <InputField
              label="Ties steel length (m)"
              value={input.tiesSteelLength}
              onChange={handleChange('tiesSteelLength')}
            />

            <TouchableOpacity style={styles.reset} onPress={handleReset}>
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

                <Result label="Volume" value={`${volume} m³`} />
                <Result label="lat ties diam Ø (mm)" value={latTiesDiameter} />
                <Result
                  label="# of pcs lat ties (option A)"
                  value={pcsLatTiesOptionA || '-'}
                />

                <Result
                  label="# of tie wires (option a)"
                  value={tieWiresOptionA || '-'}
                />
                <Result
                  label="# of pcs lat ties (option B) one Ø"
                  value={pcsLatTiesOptionBOne || '-'}
                />
                <Result
                  label="# of tie wires (option b) one Ø"
                  value={tieWiresOptionBOne || '-'}
                />
                <Result
                  label="# of lat ties (option B) two Ø"
                  value={pcsLatTiesOptionBTwo || '-'}
                />
                <Result
                  label="# of tie wires (option b) two Ø"
                  value={tieWiresOptionBTwo || '-'}
                />
              </View>

              <View style={[styles.resultCard, { marginTop: 20 }]}>
                <Text style={styles.resultTitle}>
                  Column Wastage / Bar Length
                </Text>

                <Result
                  label="6m Waste"
                  value={`${waste6m.toFixed(3)} (${getWasteRemark(waste6m)})`}
                />

                <Result
                  label="7.5m Waste"
                  value={`${waste75m.toFixed(3)} (${getWasteRemark(waste75m)})`}
                />

                <Result
                  label="9m Waste"
                  value={`${waste9m.toFixed(3)} (${getWasteRemark(waste9m)})`}
                />

                <Result
                  label="10.5m Waste"
                  value={`${waste105m.toFixed(3)} (${getWasteRemark(waste105m)})`}
                />

                <Result
                  label="12m Waste"
                  value={`${waste12m.toFixed(3)} (${getWasteRemark(waste12m)})`}
                />
                <Result label="kgs/cu.m" value={kgsPerCuM || '-'} />
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
    color: '#1e293b',
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

  resultCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
  },

  resultTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },

  resultLabel: {
    color: '#94a3b8',
  },

  resultValue: {
    color: '#fff',
    fontWeight: '700',
  },
});
