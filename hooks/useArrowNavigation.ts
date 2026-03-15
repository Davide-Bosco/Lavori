import { useEffect, RefObject } from 'react';

interface ArrowNavigationOptions {
  /**
   * Container ref that holds all navigable elements
   */
  containerRef: RefObject<HTMLElement>;
  
  /**
   * CSS selector for navigable elements (default: 'button, a, [role="button"], [tabindex="0"]')
   */
  selector?: string;
  
  /**
   * Enable vertical navigation (ArrowUp/ArrowDown) - default: true
   */
  enableVertical?: boolean;
  
  /**
   * Enable horizontal navigation (ArrowLeft/ArrowRight) - default: false
   */
  enableHorizontal?: boolean;
  
  /**
   * Enable grid navigation (2D navigation) - default: false
   */
  enableGrid?: boolean;
  
  /**
   * Number of columns for grid navigation
   */
  gridColumns?: number;
  
  /**
   * Loop navigation (go to first when reaching last) - default: true
   */
  loop?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * Custom hook for arrow key navigation
 * Enables ArrowUp/ArrowDown/ArrowLeft/ArrowRight navigation between focusable elements
 */
export function useArrowNavigation({
  containerRef,
  selector = 'button:not([disabled]), a:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])',
  enableVertical = true,
  enableHorizontal = false,
  enableGrid = false,
  gridColumns = 1,
  loop = true,
  disabled = false,
}: ArrowNavigationOptions) {
  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const container = containerRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        return;
      }

      // Get all navigable elements
      const elements = Array.from(
        container.querySelectorAll<HTMLElement>(selector)
      ).filter(el => {
        // Filter out invisible elements
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });

      if (elements.length === 0) return;

      // Find currently focused element
      const currentIndex = elements.findIndex(el => el === document.activeElement);
      
      // If no element is focused, focus the first one on any arrow key
      if (currentIndex === -1) {
        e.preventDefault();
        elements[0].focus();
        return;
      }

      let nextIndex = currentIndex;

      // Grid navigation (2D)
      if (enableGrid) {
        const currentRow = Math.floor(currentIndex / gridColumns);
        const currentCol = currentIndex % gridColumns;
        const totalRows = Math.ceil(elements.length / gridColumns);

        switch (e.key) {
          case 'ArrowUp':
            if (currentRow > 0) {
              nextIndex = (currentRow - 1) * gridColumns + currentCol;
            } else if (loop) {
              // Go to last row, same column
              const lastRow = totalRows - 1;
              nextIndex = Math.min(lastRow * gridColumns + currentCol, elements.length - 1);
            }
            break;
          case 'ArrowDown':
            if (currentRow < totalRows - 1) {
              nextIndex = Math.min((currentRow + 1) * gridColumns + currentCol, elements.length - 1);
            } else if (loop) {
              // Go to first row, same column
              nextIndex = currentCol;
            }
            break;
          case 'ArrowLeft':
            if (currentCol > 0) {
              nextIndex = currentIndex - 1;
            } else if (loop) {
              // Go to last column of same row
              nextIndex = Math.min((currentRow + 1) * gridColumns - 1, elements.length - 1);
            }
            break;
          case 'ArrowRight':
            if (currentCol < gridColumns - 1 && currentIndex < elements.length - 1) {
              nextIndex = Math.min(currentIndex + 1, elements.length - 1);
            } else if (loop) {
              // Go to first column of same row
              nextIndex = currentRow * gridColumns;
            }
            break;
        }
      } 
      // Horizontal navigation only
      else if (enableHorizontal && !enableVertical) {
        switch (e.key) {
          case 'ArrowLeft':
            nextIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? elements.length - 1 : currentIndex);
            break;
          case 'ArrowRight':
            nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex);
            break;
        }
      }
      // Vertical navigation only
      else if (enableVertical && !enableHorizontal) {
        switch (e.key) {
          case 'ArrowUp':
            nextIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? elements.length - 1 : currentIndex);
            break;
          case 'ArrowDown':
            nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex);
            break;
        }
      }
      // Both vertical and horizontal
      else if (enableVertical && enableHorizontal) {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowLeft':
            nextIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? elements.length - 1 : currentIndex);
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex);
            break;
        }
      }

      // If index changed, prevent default and focus new element
      if (nextIndex !== currentIndex) {
        e.preventDefault();
        elements[nextIndex].focus();
        
        // Scroll into view if needed
        elements[nextIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, selector, enableVertical, enableHorizontal, enableGrid, gridColumns, loop, disabled]);
}

/**
 * Hook for bottom navigation with horizontal arrow navigation
 */
export function useBottomNavArrowNavigation(
  containerRef: RefObject<HTMLElement>,
  disabled = false
) {
  return useArrowNavigation({
    containerRef,
    selector: 'button:not([disabled])',
    enableVertical: false,
    enableHorizontal: true,
    loop: true,
    disabled,
  });
}

/**
 * Hook for vertical list navigation (cards, options, etc.)
 */
export function useVerticalListNavigation(
  containerRef: RefObject<HTMLElement>,
  disabled = false
) {
  return useArrowNavigation({
    containerRef,
    selector: 'button:not([disabled]), a:not([disabled]), [role="button"]:not([disabled]), [role="article"][tabindex="0"]:not([disabled])',
    enableVertical: true,
    enableHorizontal: false,
    loop: true,
    disabled,
  });
}

/**
 * Hook for grid navigation (e.g., settings with multiple columns)
 */
export function useGridNavigation(
  containerRef: RefObject<HTMLElement>,
  columns: number,
  disabled = false
) {
  return useArrowNavigation({
    containerRef,
    enableGrid: true,
    gridColumns: columns,
    loop: true,
    disabled,
  });
}
