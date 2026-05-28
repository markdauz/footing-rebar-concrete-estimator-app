import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Footing() {
  const insets = useSafeAreaInsets();

  const [excavationHeight, setExcavationHeight] = useState('');

  const [footingWidth, setFootingWidth] = useState('');

  const [footingLength, setFootingLength] = useState('');

  const [footingThickness, setFootingThickness] = useState('');

  const [numberOfFooting, setNumberOfFooting] = useState('');

  const [columnWidth, setColumnWidth] = useState('');

  const [columnLength, setColumnLength] = useState('');

  const [numberOfColumn, setNumberOfColumn] = useState('');

  const [manHour, setManHour] = useState('');

  const [volumeCuM, setVolumeCuM] = useState('');

  const [hoursPerDay, setHoursPerDay] = useState('');

  const [numberOfLaborers, setNumberOfLaborers] = useState('');

  const [ratePerDay, setRatePerDay] = useState('');

  const gravelBed = 0.1;

  const formworksAllowance = 0.25;

  const workingSpace = 0.6;

  const handleNumberInput = (
    value: string,
    setter: (value: string) => void,
  ) => {
    const sanitized = value.replace(/[^0-9.]/g, '');

    const parts = sanitized.split('.');

    if (parts.length > 2) {
      return;
    }

    setter(sanitized);
  };

  const toNumber = (value: string) => parseFloat(value || '0') || 0;

  const excavationWithoutFormworks = useMemo(() => {
    if (!numberOfFooting) {
      return 0;
    }

    return (
      toNumber(numberOfFooting) *
      (toNumber(excavationHeight) *
        toNumber(footingWidth) *
        toNumber(footingLength) +
        toNumber(footingWidth) * toNumber(footingLength) * 0.1)
    );
  }, [excavationHeight, footingWidth, footingLength, numberOfFooting]);

  const backfillWithoutFormworks = useMemo(() => {
    if (!excavationWithoutFormworks) {
      return 0;
    }

    return Number(
      (
        excavationWithoutFormworks -
        toNumber(footingWidth) *
          toNumber(footingLength) *
          toNumber(footingThickness) *
          toNumber(numberOfFooting) -
        toNumber(numberOfColumn) *
          ((toNumber(excavationHeight) - toNumber(footingThickness)) *
            (toNumber(columnWidth) * toNumber(columnLength)))
      ).toFixed(1),
    );
  }, [
    excavationWithoutFormworks,
    footingWidth,
    footingLength,
    footingThickness,
    numberOfFooting,
    numberOfColumn,
    excavationHeight,
    columnWidth,
    columnLength,
  ]);

  const excavationWithFormworks = useMemo(() => {
    if (!numberOfFooting) {
      return 0;
    }

    return (
      toNumber(numberOfFooting) *
      (toNumber(excavationHeight) *
        toNumber(footingWidth) *
        toNumber(footingLength) +
        2 * toNumber(footingWidth) * 0.25 * toNumber(excavationHeight) +
        2 * toNumber(footingLength) * 0.25 * toNumber(excavationHeight) +
        toNumber(footingWidth) * toNumber(footingLength) * 0.1)
    );
  }, [excavationHeight, footingWidth, footingLength, numberOfFooting]);

  const backfillWithFormworks = useMemo(() => {
    if (!excavationWithFormworks) {
      return 0;
    }

    return Number(
      (
        excavationWithFormworks -
        toNumber(footingWidth) *
          toNumber(footingLength) *
          toNumber(footingThickness) *
          toNumber(numberOfFooting) -
        toNumber(numberOfColumn) *
          ((toNumber(excavationHeight) - toNumber(footingThickness)) *
            (toNumber(columnWidth) * toNumber(columnLength)))
      ).toFixed(1),
    );
  }, [
    excavationWithFormworks,
    footingWidth,
    footingLength,
    footingThickness,
    numberOfFooting,
    numberOfColumn,
    excavationHeight,
    columnWidth,
    columnLength,
  ]);

  const excavationWithWorkingSpace = useMemo(() => {
    if (toNumber(numberOfFooting) === 0) {
      return 0;
    }

    return (
      toNumber(numberOfFooting) *
      (toNumber(excavationHeight) *
        toNumber(footingWidth) *
        toNumber(footingLength) +
        2 * toNumber(footingWidth) * 0.85 * toNumber(excavationHeight) +
        2 * toNumber(footingLength) * 0.85 * toNumber(excavationHeight) +
        toNumber(footingWidth) * toNumber(footingLength) * 0.1)
    );
  }, [excavationHeight, footingWidth, footingLength, numberOfFooting]);

  const backfillWithWorkingSpace = useMemo(() => {
    if (!excavationWithWorkingSpace) {
      return 0;
    }

    return Number(
      (
        excavationWithWorkingSpace -
        toNumber(footingWidth) *
          toNumber(footingLength) *
          toNumber(footingThickness) *
          toNumber(numberOfFooting) -
        toNumber(numberOfColumn) *
          ((toNumber(excavationHeight) - toNumber(footingThickness)) *
            (toNumber(columnWidth) * toNumber(columnLength)))
      ).toFixed(1),
    );
  }, [
    excavationWithWorkingSpace,
    footingWidth,
    footingLength,
    footingThickness,
    numberOfFooting,
    numberOfColumn,
    excavationHeight,
    columnWidth,
    columnLength,
  ]);

  const excavationWithoutWorkingSpace = useMemo(() => {
    if (!numberOfFooting) {
      return 0;
    }

    return (
      toNumber(numberOfFooting) *
      (toNumber(excavationHeight) *
        toNumber(footingWidth) *
        toNumber(footingLength) +
        2 * toNumber(footingWidth) * 0.6 * toNumber(excavationHeight) +
        2 * toNumber(footingLength) * 0.6 * toNumber(excavationHeight) +
        toNumber(footingWidth) * toNumber(footingLength) * 0.1)
    );
  }, [excavationHeight, footingWidth, footingLength, numberOfFooting]);

  const backfillWithoutWorkingSpace = useMemo(() => {
    if (!excavationWithoutWorkingSpace) {
      return 0;
    }

    return Number(
      (
        excavationWithoutWorkingSpace -
        toNumber(footingWidth) *
          toNumber(footingLength) *
          toNumber(footingThickness) *
          toNumber(numberOfFooting) -
        toNumber(numberOfColumn) *
          ((toNumber(excavationHeight) - toNumber(footingThickness)) *
            (toNumber(columnWidth) * toNumber(columnLength)))
      ).toFixed(1),
    );
  }, [
    excavationWithoutWorkingSpace,
    footingWidth,
    footingLength,
    footingThickness,
    numberOfFooting,
    numberOfColumn,
    excavationHeight,
    columnWidth,
    columnLength,
  ]);

  const totalMh = useMemo(() => {
    if (!manHour || !volumeCuM) {
      return '';
    }

    return (toNumber(manHour) * toNumber(volumeCuM)).toFixed(2);
  }, [manHour, volumeCuM]);

  const targetDays = useMemo(() => {
    if (!totalMh || !numberOfLaborers || !hoursPerDay) {
      return '';
    }

    const result =
      toNumber(totalMh) / (toNumber(numberOfLaborers) * toNumber(hoursPerDay));

    if (!isFinite(result)) {
      return '';
    }

    return result.toFixed(2);
  }, [totalMh, numberOfLaborers, hoursPerDay]);

  const laborCost = useMemo(() => {
    if (!targetDays || !ratePerDay || !numberOfLaborers) {
      return '';
    }

    return (
      toNumber(targetDays) *
      toNumber(ratePerDay) *
      toNumber(numberOfLaborers)
    ).toFixed(2);
  }, [targetDays, ratePerDay, numberOfLaborers]);

  const reset = () => {
    setExcavationHeight('');
    setFootingWidth('');
    setFootingLength('');
    setFootingThickness('');
    setNumberOfFooting('');
    setColumnWidth('');
    setColumnLength('');
    setNumberOfColumn('');
    setManHour('');
    setVolumeCuM('');
    setHoursPerDay('');
    setNumberOfLaborers('');
    setRatePerDay('');
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
              <Ionicons name="square-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Footing Earthwork</Text>

            <Text style={styles.subtitle}>Excavation Volume Calculator</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Excavation Details</Text>

            <Input
              label="Excavation Height (m)"
              value={excavationHeight}
              onChange={(v) => handleNumberInput(v, setExcavationHeight)}
            />

            <Text style={styles.sectionTitle}>Footing (m)</Text>

            <Input
              label="Width (m)"
              value={footingWidth}
              onChange={(v) => handleNumberInput(v, setFootingWidth)}
            />

            <Input
              label="Length (m)"
              value={footingLength}
              onChange={(v) => handleNumberInput(v, setFootingLength)}
            />

            <Input
              label="Thickness (m)"
              value={footingThickness}
              onChange={(v) => handleNumberInput(v, setFootingThickness)}
            />

            <Input
              label="No. of Footing"
              value={numberOfFooting}
              onChange={(v) => handleNumberInput(v, setNumberOfFooting)}
            />

            <Text style={styles.sectionTitle}>Column</Text>

            <Input
              label="Column Width (x)"
              value={columnWidth}
              onChange={(v) => handleNumberInput(v, setColumnWidth)}
            />

            <Input
              label="Column Length (y)"
              value={columnLength}
              onChange={(v) => handleNumberInput(v, setColumnLength)}
            />

            <Input
              label="No. of Column"
              value={numberOfColumn}
              onChange={(v) => handleNumberInput(v, setNumberOfColumn)}
            />

            <Text style={styles.sectionTitle}>Estimated Labor Cost</Text>

            <Input
              label="Man Hour (Mh)"
              value={manHour}
              onChange={(v) => handleNumberInput(v, setManHour)}
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Mh</Text>

              <View style={styles.autoValueBox}>
                <Text style={styles.autoValueText}>
                  {totalMh || 'Auto Computed'}
                </Text>
              </View>
            </View>

            <Input
              label="Volume (cu.m)"
              value={volumeCuM}
              onChange={(v) => handleNumberInput(v, setVolumeCuM)}
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Target Days</Text>

              <View style={styles.autoValueBox}>
                <Text style={styles.autoValueText}>
                  {targetDays || 'Auto Computed'}
                </Text>
              </View>
            </View>

            <Input
              label="Hours/Day"
              value={hoursPerDay}
              onChange={(v) => handleNumberInput(v, setHoursPerDay)}
            />

            <Input
              label="# of Laborers"
              value={numberOfLaborers}
              onChange={(v) => handleNumberInput(v, setNumberOfLaborers)}
            />

            <Input
              label="Rate/Day"
              value={ratePerDay}
              onChange={(v) => handleNumberInput(v, setRatePerDay)}
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Labor Cost</Text>

              <View style={styles.autoValueBox}>
                <Text style={styles.autoValueText}>
                  {laborCost || 'Auto Computed'}
                </Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>STRUCTURAL EXCAVATION</Text>

              <InfoRow left="Common excavation" right="" />

              <InfoRow left="Hand" right="6.00 MH/M3" />

              <InfoRow left="Machine" right="0.50 MH/M3" />

              <InfoRow left="Rock excavation" right="8.00 MH/M3" />

              <Text
                style={[
                  styles.infoTitle,
                  {
                    marginTop: 14,
                  },
                ]}
              >
                STRUCTURAL BACKFILL
              </Text>

              <InfoRow left="By hand" right="5.00 MH/M3" />

              <InfoRow left="By machine" right="2.00 MH/M3" />
            </View>

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ResultCard
            title="Without Formworks"
            excavation={excavationWithoutFormworks}
            backfill={backfillWithoutFormworks}
          />

          <ResultCard
            title="With Formworks All Sides"
            excavation={excavationWithFormworks}
            backfill={backfillWithFormworks}
          />

          <ResultCard
            title="Without Working Space"
            excavation={excavationWithoutWorkingSpace}
            backfill={backfillWithoutWorkingSpace}
          />

          <ResultCard
            title="With Working Space"
            excavation={excavationWithWorkingSpace}
            backfill={backfillWithWorkingSpace}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType="decimal-pad"
        style={styles.input}
        placeholder="Enter value"
      />
    </View>
  );
}

function ResultCard({
  title,
  excavation,
  backfill,
}: {
  title: string;
  excavation: number;
  backfill: number;
}) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultTitle}>{title}</Text>

      <Result label="Excavation" value={`${excavation.toFixed(3)} m³`} />

      <Result label="Backfill" value={`${backfill.toFixed(3)} m³`} />
    </View>
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

function InfoRow({ left, right }: { left: string; right: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLeft}>{left}</Text>

      <Text style={styles.infoRight}>{right}</Text>
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
    textAlign: 'center',
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

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
    marginTop: 10,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    color: '#334155',
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
    fontWeight: '600',
    color: '#0f172a',
  },

  autoValueBox: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },

  autoValueText: {
    fontWeight: '600',
    color: '#334155',
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },

  infoTitle: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },

  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },

  infoLeft: {
    color: '#334155',
    fontSize: 13,
  },

  infoRight: {
    fontWeight: '700',
    color: '#0f172a',
    fontSize: 13,
  },

  reset: {
    marginTop: 8,
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
    marginBottom: 16,
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
});
