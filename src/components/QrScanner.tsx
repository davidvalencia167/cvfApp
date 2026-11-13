import { useEffect, useRef } from 'react';
import type { Html5Qrcode as Html5QrcodeScanner } from 'html5-qrcode';
import { Platform, StyleSheet, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

type QrScannerProps = {
  onScan: (token: string) => void;
  onError: (message: string) => void;
};

const READER_ID = 'attendee-qr-reader';

export function QrScanner({ onScan, onError }: QrScannerProps) {
  const onScanRef = useRef(onScan);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onScanRef.current = onScan;
    onErrorRef.current = onError;
  }, [onScan, onError]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      onErrorRef.current('El escáner de accesos funciona desde el navegador.');
      return;
    }

    let cancelled = false;
    let scanner: Html5QrcodeScanner | null = null;

    (async () => {
      const { Html5Qrcode } = await import('html5-qrcode');
      if (cancelled) return;
      const instance = new Html5Qrcode(READER_ID);
      scanner = instance;
      await instance.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText: string) => onScanRef.current(decodedText),
        () => {},
      );
    })().catch(() => {
      if (!cancelled) onErrorRef.current('No pudimos abrir la cámara. Revisa que hayas dado permiso al navegador.');
    });

    return () => {
      cancelled = true;
      const active = scanner;
      if (!active) return;
      active.stop().catch(() => {}).finally(() => active.clear());
    };
  }, []);

  return <View nativeID={READER_ID} style={styles.reader} />;
}

const styles = StyleSheet.create({
  reader: { width: '100%', minHeight: 300, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
