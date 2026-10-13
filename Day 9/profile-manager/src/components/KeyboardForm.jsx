import { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform,
  ScrollView, TextInput, Pressable, Keyboard,
} from 'react-native';
import { colors, spacing, radius } from '../utils/theme';
import Button from './Button';
import { useToast } from '../contexts/ToastContext';

export default function KeyboardForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', bio: '' });
  const [focused, setFocused] = useState(null);

  const emailRef = useRef(null);
  const bioRef = useRef(null);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!form.name.trim()) {
      showToast('Name required', 'error');
      return;
    }
    showToast(`Submitted: ${form.name}`, 'success');
  };

  const InputField = ({ label, value, onChangeText, onFocus, onBlur, innerRef, ...props }) => {
    const isFocused = focused === label;
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={innerRef}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => { setFocused(label); onFocus?.(); }}
          onBlur={() => { setFocused(null); onBlur?.(); }}
          placeholderTextColor={colors.textDim}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            props.multiline && { minHeight: 80, textAlignVertical: 'top' },
          ]}
          {...props}
        />
        {isFocused && <Text style={styles.focusHint}>Keyboard open hai — scroll karke dekh lo</Text>}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Form with Keyboard Handling</Text>
        <Text style={styles.subheading}>
          Input pe tap karo — keyboard na dhake content ko
        </Text>

        <InputField
          label="NAME"
          value={form.name}
          onChangeText={(v) => update('name', v)}
          placeholder="Your name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          blurOnSubmit={false}
        />

        <InputField
          label="EMAIL"
          value={form.email}
          onChangeText={(v) => update('email', v)}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          innerRef={emailRef}
          onSubmitEditing={() => bioRef.current?.focus()}
          blurOnSubmit={false}
        />

        <InputField
          label="BIO"
          value={form.bio}
          onChangeText={(v) => update('bio', v)}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
          innerRef={bioRef}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <View style={styles.actions}>
          <Button variant="primary" onPress={handleSubmit}>
            ✓ Submit Form
          </Button>
          <Button variant="ghost" onPress={() => Keyboard.dismiss()} style={{ marginTop: 8 }}>
            ⌨️ Dismiss Keyboard
          </Button>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.md, paddingBottom: spacing.xxl * 3 },
  heading: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 6 },
  subheading: { fontSize: 13, color: colors.textMuted, marginBottom: 20 },
  field: { marginBottom: 16 },
  label: { fontSize: 11, fontWeight: '600', color: colors.textMuted, letterSpacing: 0.4, marginBottom: 6 },
  input: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    minHeight: 48,
  },
  inputFocused: { borderColor: colors.primary, backgroundColor: colors.bgCard },
  focusHint: { fontSize: 10, color: colors.primary, marginTop: 4, fontWeight: '600' },
  actions: { marginTop: 12 },
  spacer: { height: 400 }, // extra space for keyboard testing
});